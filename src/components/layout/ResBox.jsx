import React, { memo, useMemo, useState, useEffect, useCallback, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeSanitize from 'rehype-sanitize';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

// --- Syntax Highlighter Imports ---
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';

const LANGUAGES = { javascript, js: javascript, jsx, typescript, ts: typescript, python, py: python, css, json, bash, sh: bash };
Object.entries(LANGUAGES).forEach(([name, lang]) => SyntaxHighlighter.registerLanguage(name, lang));

// --- HOOK: Copy to Clipboard ---
const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text) => {
    try 
    {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      return false;
    }
  }, []);

  return { copied, copy };
};

// --- TYPING INDICATOR ---
const TypingIndicator = memo(() => (
  <div className="flex items-center mt-4 space-x-2 font-playfair">
    {[0, 150, 300].map((delay, idx) => (
      <span key={idx} className="w-2 h-2 bg-[#F5F5DC] rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
    ))}
  </div>
));
TypingIndicator.displayName = 'TypingIndicator';

// --- CODE BLOCK ---
const CodeBlock = memo(({ children, className, ...props }) => {
  const { copied, copy } = useCopyToClipboard();
  const match = /language-([\w+-]+)/.exec(className || '');
  const language = match?.[1]?.toLowerCase() || '';
  const code = String(children).replace(/\n$/, '');
  const supported = Object.keys(LANGUAGES);

  if (!match) 
  {
    return <code className="bg-gray-800 text-amber-300 px-2 py-1 rounded text-sm font-mono break-all max-w-full font-playfair">{children}</code>;
  }

  return (
    <div className="relative group w-full max-w-full overflow-hidden bg-[#0000004D] border border-black rounded-lg p-1">
      <button
        onClick={() => copy(code)}
        className="absolute top-2 right-2 p-2 bg-[#F5F5DC] hover:bg-[#e0e0d1] active:bg-[#d0d0c1] rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 shadow-sm"
        type="button"
      >
        {copied ? <Check className="h-4 w-4 text-green-700" /> : <Copy className="h-4 w-4 text-gray-700" />}
      </button>
      <div className="overflow-x-auto w-full max-w-full">
        {supported.includes(language) ? (
          <SyntaxHighlighter
            className="scrollbar-hide"
            style={{
              ...oneDark,
              'pre[class*="language-"]': {
                ...oneDark['pre[class*="language-"]'],
                background: 'rgba(0, 0, 0, 0.3)',
                margin: 0,
                padding: '1rem',
                overflow: 'auto',
                borderRadius: '0.5rem',
                border: '1px solid black',
              },
              'code[class*="language-"]': {
                ...oneDark['code[class*="language-"]'],
                background: 'transparent',
                textShadow: 'none',
                padding:'10px'
              },
              'pre[class*="language-"] code': {
                background: 'transparent',
              },
            }}
            language={language}
            PreTag="div"
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              maxWidth: '100%',
              overflowWrap: 'anywhere',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              backgroundColor: 'transparent',
              border: 'none',
              padding: 0
            }}
            wrapLines
            wrapLongLines
            {...props}
          >
            {code}
          </SyntaxHighlighter>
        ) : (
          <pre className="text-sm p-4 bg-gray-900 rounded-md overflow-x-auto">
            <code className="text-amber-300 font-mono break-all font-playfair">{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
});
CodeBlock.displayName = 'CodeBlock';

// --- CUSTOM COMPONENTS FOR MARKDOWN ---
const createMarkdownComponents = () => ({
  code: CodeBlock,
  // Mantendo a renderização básica do Markdown para o corpo da resposta da IA
  h1: (p) => <h1 className="text-2xl font-bold text-white/90 mb-4 mt-6 font-playfair" {...p} />,
  h2: (p) => <h2 className="text-xl font-semibold text-white/85 mb-3 mt-5 font-playfair" {...p} />,
  h3: (p) => <h3 className="text-lg font-semibold text-white/80 mb-2 mt-4 font-playfair" {...p} />,
  p: (p) => <p className="text-white/75 mb-4 leading-relaxed break-words font-playfair" {...p} />,
  a: ({ href, ...p }) => <a href={href} target="_blank" rel="noreferrer" className="text-amber-400 underline break-all font-playfair" {...p} />,
});

// --- NEW: USER MESSAGE DISPLAY COMPONENT ---
const UserMessage = memo(({ content }) => (
  <div className="flex justify-end mb-6">
    <div className="max-w-[85%] p-4 rounded-3xl bg-[#0000004D] border-black border font-semibold text-white shadow-md break-words">
      <p className="m-0 leading-relaxed font-playfair">{content}</p>
    </div>
    <div className="w-6 h-6 rounded-full bg-[#0000004D] border-black border flex justify-end"></div>
    <div className="w-2 h-2 rounded-full bg-[#0000004D] border-black border flex justify-end"></div>
  </div>
));
UserMessage.displayName = 'UserMessage';

// --- HOOK: Process Conversations ---
const useConversationProcessor = (messages, isGenerating) => {
  const [conversation, setConversation] = useState([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [tokenCount, setTokenCount] = useState(0);

  useEffect(() => {
    if (!messages?.length && !isGenerating) {
      setCurrentResponse('');
      setTokenCount(0);
      return;
    }
    let responseTokens = '';
    let tokens = 0;
    messages.forEach(msg => {
      if (msg.token) { responseTokens += msg.token; tokens++; }
      else if (msg.content) responseTokens += msg.content;
    });
    setCurrentResponse(responseTokens);
    setTokenCount(tokens);
  }, [messages, isGenerating]);

  // Pass user message to conversation list
  const addUserMessage = useCallback((message) => setConversation(prev => [...prev, { type: 'user', content: message }]), []);
  
  // Finalize assistant response
  useEffect(() => {
    if (!isGenerating && currentResponse.trim()) 
    {
      setConversation(prev => [...prev, { type: 'assistant', content: currentResponse.trim() }]);
      setCurrentResponse('');
      setTokenCount(0);
    }
  }, [isGenerating, currentResponse]);

  // Combining finalized conversation messages and the current streaming response
  const fullConversation = useMemo(() => {
    const list = [...conversation];
    if (currentResponse) {
      list.push({ type: 'assistant', content: currentResponse });
    }
    return list;
  }, [conversation, currentResponse]);

  return { fullConversation, currentResponse, tokenCount, addUserMessage };
};

// --- RESBOX COMPONENT ---
const ResBox = memo(({ messages = [], isGenerating = false, className = '', showTypingIndicator = true, showWelcome = true, onUserMessage }) => {
  const { fullConversation, currentResponse, tokenCount, addUserMessage } = useConversationProcessor(messages, isGenerating);
  const messagesEndRef = useRef(null);
  const markdownComponents = useMemo(() => ({
  ...createMarkdownComponents(),
  ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 text-white/75" {...props} />,
  ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 text-white/75" {...props} />,
  li: ({node, ...props}) => <li className="mb-1 text-white/75" {...props} />,
  code: ({node, inline, className, children, ...props}) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <CodeBlock className={className} {...props}>
        {String(children).replace(/\n$/, '')}
      </CodeBlock>
    ) : (
      <code className="bg-gray-800 text-amber-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
        {children}
      </code>
    );
  }
}), []);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => { if (onUserMessage) onUserMessage(addUserMessage); }, [onUserMessage, addUserMessage]);
  
  // Scroll Logic
  useEffect(() => {
    if (!messagesEndRef.current) return;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); scrollTimeoutRef.current = null; }, 100);
  }, [fullConversation.length, currentResponse, isGenerating]); // Scroll on new messages or new response token

  // Welcome Message (Checking against fullConversation now)
  if (fullConversation.length === 0 && !isGenerating && showWelcome) 
  {
    return (
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="font-playfair text-[#F5F5DC] font-bold text-4xl">Ask About the Project!</h1> 
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 flex items-start justify-center pt-20 pl-10 pr-10 ${className}`}
      style={{ zIndex: 1, pointerEvents: 'none' }}
    >
      <div
        className="relative w-full max-w-4xl p-4 pointer-events-auto scrollbar-hide text-white/80"
        style={{ maxHeight: '65vh', overflowY: 'auto' }}
      >
        { (isGenerating || tokenCount > 0) && (
          <div className="text-center mb-2 shrink-0 fixed top-6 left-1/2 transform -translate-x-1/2">
            <span className="text-white text-sm bg-black/80 px-3 py-1 rounded-full font-playfair">Tokens: {tokenCount}</span>
          </div>
        )}

        {fullConversation.map((msg, index) => (
          <React.Fragment key={index}>
            {msg.type === 'user' ? (
              <UserMessage content={msg.content} />
            ) : (
              // Assistant Message: Render a clean Markdown section
              <div className="mb-6 font-playfair text-white/80 [&>p]:text-white/75 [&>ul]:text-white/75 [&>ol]:text-white/75 [&>li]:text-white/75 [&>h1]:text-white/90 [&>h2]:text-white/85 [&>h3]:text-white/80">
                 <ReactMarkdown
                   remarkPlugins={[remarkGfm, remarkBreaks]}
                   rehypePlugins={[rehypeSanitize]}
                   components={markdownComponents}
                 >
                   {msg.content}
                 </ReactMarkdown>
              </div>
            )}
          </React.Fragment>
        ))}
        {/* END NEW */}

        {isGenerating && showTypingIndicator && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
});
ResBox.displayName = 'ResBox';

export default ResBox


