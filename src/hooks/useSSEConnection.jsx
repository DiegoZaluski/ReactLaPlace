import { useState, useRef, useCallback, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8080'; 

// --- SSEParser Class ---
/**
 * Utility class to parse the HTTP response stream as Server-Sent Events (SSE).
 * Handles buffering of incomplete events and lines (crucial for robustness).
 */
class SSEParser {
    constructor(onEvent) {
        this.onEvent = onEvent;
        this.buffer = ''; 
        this.currentEvent = { event: 'message', data: '' };
    }

    // Processes the received chunk from the stream
    parse(chunk) {
        this.buffer += chunk;
        const lines = this.buffer.split('\n');
        
        this.buffer = lines.pop(); 

        for (const line of lines) {
            if (line.trim() === '') {
                if (this.currentEvent.data) {
                    this.onEvent(this.currentEvent.event, this.currentEvent.data.trim());
                }
                this.currentEvent = { event: 'message', data: '' };
                continue;
            }

            const [field, ...rest] = line.split(':');
            const value = rest.join(':').trimStart(); 

            if (field === 'event') {
                this.currentEvent.event = value;
            } else if (field === 'data') {
                this.currentEvent.data += value + '\n';
            }
        }
    }
}


export const useSSEConnection = (apiUrl = `${API_BASE_URL}/generate/stream`, stopUrl = `${API_BASE_URL}/generate/stop`) => 
{
    // --- State & Refs Initialization ---
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const controllerRef = useRef(null); 

    // --- Browser Context Helper ---
    const getBrowserContext = useCallback(() => 
    {
        const urlParams = new URLSearchParams(window.location.search);
        const urlLanguage = urlParams.get('lang') || urlParams.get('language');
        return {
            language: urlLanguage || navigator.language || 'pt-BR',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            userAgent: navigator.userAgent?.substring(0, 100),
            source: urlLanguage ? 'url_param' : 'browser_default'
        };
    }, []);

    // --- Stop Generation Function ---
    const stopGeneration = useCallback(async () => {
        if (!isGenerating) return;

        console.log('[STOP] Requesting generation stop...');
        
        // 1. Send the stop command to the server
        try {
            await fetch(stopUrl, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'stop' }) 
            });
        } catch (error) {
            console.error('[STOP] Error sending stop command to server:', error);
        }

        // 2. Abort the pending fetch request on the client
        if (controllerRef.current) {
            controllerRef.current.abort();
            controllerRef.current = null;
        }

        setIsGenerating(false);
        setIsConnected(false);
        console.log('[STOP] Generation stopped by client.');
        
    }, [isGenerating, stopUrl]);

    // --- SSE Event Handler ---
    const handleSSEEvent = useCallback((eventType, data) => {
        
        if (data.trim() === '[DONE]') {
            console.log('Stream finished with [DONE]');
            return;
        }
        
        try {
            const parsed = JSON.parse(data);
            
            // CORRECTION: Add each token as a new object to enable token counting
            if (eventType === 'token') {
                setMessages(prev => [...prev, parsed]);
                
            } else if (eventType === 'end' || eventType === 'error') {
                console.log(`Stream end/error event: ${JSON.stringify(parsed)}`);
                if (eventType === 'end' && parsed.status === 'interrupted') {
                     setMessages(prev => [...prev, { status: 'interrupted', message: 'Generation interrupted.' }]);
                }
            } else {
                 console.log(`Other event type (${eventType}): ${JSON.stringify(parsed)}`);
            }
        } catch (parseError) {
            console.warn(`[SSE Parse Error] Event Type: ${eventType}, Data: ${data}`, parseError);
        }

    }, []);

    // --- Send Message Function ---
    const sendMessage = useCallback(async (messageText) => 
    {
        if (isGenerating) {
            console.warn("Generation already in progress. Ignoring new message.");
            return;
        }

        console.log('Sending message:', messageText);
        
        // Reset state
        setMessages([]);
        setIsGenerating(true);
        setIsConnected(true);
        controllerRef.current = new AbortController(); 

        try 
        {
            // 1. Make the POST request with AbortController
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/event-stream' 
                },
                body: JSON.stringify({
                    prompt: messageText,
                    context: getBrowserContext(),
                }),
                signal: controllerRef.current.signal 
            });

            if (!response.ok || response.status !== 200) 
            {
                const errorText = await response.text();
                const lines = errorText.split('\n');
                let errorMessage = `HTTP Error: ${response.status}`;
                for(const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const errorData = JSON.parse(line.slice(6));
                            errorMessage += ` - ${errorData.error || errorData.message || 'Unknown server error'}`;
                            break;
                        } catch(e) { /* ignore parse error */ }
                    }
                }
                throw new Error(errorMessage);
            }

            console.log('POST sent successfully, reading stream...');
            
            // 2. Set up the stream reader
            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error('Stream not supported or body is null.');
            }

            const decoder = new TextDecoder();
            const parser = new SSEParser(handleSSEEvent); 

            // 3. Stream reading loop
            while (true) 
            {
                const { done, value } = await reader.read();
                if (done) 
                {
                    console.log('Stream finished (done=true)');
                    break;
                }

                const chunk = decoder.decode(value, { stream: true });
                parser.parse(chunk); 
            }

        } 
        catch (error) 
        {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted by user.');
            } else {
                console.error('Error sending message or processing stream:', error);
                setMessages(prev => [...prev, { 
                    error: true, 
                    message: `Error: ${error.message}` 
                }]);
            }
        } 
        finally 
        {
            if (controllerRef.current) {
                controllerRef.current = null;
                setIsGenerating(false);
                setIsConnected(false);
            }
        }
    }, [apiUrl, getBrowserContext, isGenerating, handleSSEEvent]);


    // --- Cleanup Hook ---
    useEffect(() => 
    {
        return () => 
        {
            if (controllerRef.current) {
                controllerRef.current.abort(); 
            }
        };
    }, []);

    // --- Exported Values ---
    return {
        isConnected,
        isGenerating,
        messages,
        sendMessage,
        stopGeneration, 
        getBrowserContext
    };
};

