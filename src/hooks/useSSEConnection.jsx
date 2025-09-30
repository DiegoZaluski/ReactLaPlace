import { useState, useRef, useCallback, useEffect } from 'react';

export const useSSEConnection = () => 
{
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const eventSourceRef = useRef(null);

    const disconnect = useCallback(() => 
    {
        if (eventSourceRef.current) 
        {
            console.log('Disconnecting SSE...');
            eventSourceRef.current.close();
            eventSourceRef.current = null;
            setIsConnected(false);
            setIsGenerating(false);
        }
    }, []);

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

    // Send message and start streaming response
    const sendMessage = useCallback(async (messageText) => 
    {
        console.log('Sending message:', messageText);
        
        // Clear previous messages
        setMessages([]);
        setIsGenerating(true);
        
        try 
        {
            // Step 1: Disconnect any previous connection
            disconnect();
            
            // Step 2: Make POST request to start streaming
            const response = await fetch('/api/generate/stream', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: messageText,
                    context: getBrowserContext(),
                }),
            });

            if (!response.ok) 
            {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            console.log('POST sent successfully, waiting for stream...');
            
            // Step 3: Read response as stream
            const reader = response.body?.getReader();
            if (!reader) 
            {
                throw new Error('Stream not supported');
            }

            setIsConnected(true);
            const decoder = new TextDecoder();

            while (true) 
            {
                const { done, value } = await reader.read();
                if (done) 
                {
                    console.log('Stream finished');
                    break;
                }

                const chunk = decoder.decode(value, { stream: true });
                console.log('Chunk received:', chunk);

                // Process each SSE line
                const lines = chunk.split('\n');
                for (const line of lines) 
                {
                    if (line.startsWith('data: ')) 
                    {
                        const data = line.slice(6); // Remove 'data: ' prefix
                        if (data.trim() && data !== '[DONE]') 
                        {
                            try 
                            {
                                const parsed = JSON.parse(data);
                                console.log('Parsed data:', parsed);
                                setMessages(prev => [...prev, parsed]);
                            } 
                            catch (parseError) 
                            {
                                console.warn('Parse error:', parseError);
                                setMessages(prev => [...prev, { raw: data }]);
                            }
                        }
                    }
                }
            }

        } 
        catch (error) 
        {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { 
                error: true, 
                message: `Error: ${error.message}` 
            }]);
        } 
        finally 
        {
            setIsGenerating(false);
            setIsConnected(false);
        }
    }, [disconnect, getBrowserContext]);

    useEffect(() => 
    {
        return () => 
        {
            disconnect();
        };
    }, [disconnect]);

    return {
        isConnected,
        isGenerating,
        messages,
        sendMessage,
        disconnect,
        getBrowserContext
    };
};


