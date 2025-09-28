import React, { memo, useMemo, useState, useEffect, useCallback, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeSanitize from 'rehype-sanitize';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';

const LANGUAGES = { javascript, js: javascript, jsx, typescript, ts: typescript, python, py: python, css, json, bash, sh: bash };
Object.entries(LANGUAGES).forEach(([name, lang]) => SyntaxHighlighter.registerLanguage(name, lang));

/** Hook para copiar texto para clipboard */
const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (err) {
      console.error('Falha ao copiar:', err);
      return false;
    }
  }, []);

  return { copied, copy };
};

/** Indicador de digitação */
const TypingIndicator = memo(() => (
  <div className="flex items-center mt-4 space-x-2">
    {[0, 150, 300].map((delay, idx) => (
      <span key={idx} className="w-2 h-2 bg-[#F5F5DC] rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
    ))}
  </div>
));
TypingIndicator.displayName = 'TypingIndicator';

/** Bloco de código com copiar */
const CodeBlock = memo(({ children, className, ...props }) => {
  const { copied, copy } = useCopyToClipboard();
  const match = /language-([\w+-]+)/.exec(className || '');
  const language = match?.[1]?.toLowerCase() || '';
  const code = String(children).replace(/\n$/, '');
  const supported = Object.keys(LANGUAGES);

  if (!match) {
    return <code className="bg-gray-800 text-amber-300 px-2 py-1 rounded text-sm font-mono break-all max-w-full">{children}</code>;
  }

  return (
    <div className="relative group w-full max-w-full overflow-hidden">
      <button
        onClick={() => copy(code)}
        className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        type="button"
      >
        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-gray-300" />}
      </button>
      <div className="overflow-x-auto w-full max-w-full">
        {supported.includes(language) ? (
          <SyntaxHighlighter
            style={oneDark}
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
              wordBreak: 'break-word'
            }}
            wrapLines
            wrapLongLines
            {...props}
          >
            {code}
          </SyntaxHighlighter>
        ) : (
          <pre className="text-sm p-4 bg-gray-900 rounded-md overflow-x-auto">
            <code className="text-amber-300 font-mono break-all">{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
});
CodeBlock.displayName = 'CodeBlock';

/** Componentes customizados para Markdown */
const createMarkdownComponents = () => ({
  code: CodeBlock,
  h1: (p) => <h1 className="text-2xl font-bold text-[#F5F5DC] mb-4 mt-6" {...p} />,
  h2: (p) => <h2 className="text-xl font-semibold text-[#F5F5DC] mb-3 mt-5" {...p} />,
  h3: (p) => <h3 className="text-lg font-semibold text-[#F5F5DC] mb-2 mt-4" {...p} />,
  p: (p) => <p className="text-[#F5F5DC] mb-4 leading-relaxed break-words" {...p} />,
  a: ({ href, ...p }) => <a href={href} target="_blank" rel="noreferrer" className="text-amber-400 underline break-all" {...p} />,
});

/** Hook para processar conversas */
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

  const addUserMessage = useCallback((message) => setConversation(prev => [...prev, { type: 'user', content: message }]), []);
  useEffect(() => {
    if (!isGenerating && currentResponse.trim()) {
      setConversation(prev => [...prev, { type: 'assistant', content: currentResponse.trim() }]);
      setCurrentResponse('');
      setTokenCount(0);
    }
  }, [isGenerating, currentResponse]);

  const fullContent = useMemo(() => conversation.map(msg => (msg.type === 'user' ? `**Você:** ${msg.content}\n\n` : `${msg.content}\n\n`)).join('') + (currentResponse || ''), [conversation, currentResponse]);

  return { fullContent, tokenCount, addUserMessage };
};

/** Componente ResBox Fantasma */
const ResBox = memo(({ messages = [], isGenerating = false, className = '', showTypingIndicator = true, showWelcome = true, onUserMessage }) => {
  const { fullContent, tokenCount, addUserMessage } = useConversationProcessor(messages, isGenerating);
  const messagesEndRef = useRef(null);
  const markdownComponents = useMemo(createMarkdownComponents, []);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => { if (onUserMessage) onUserMessage(addUserMessage); }, [onUserMessage, addUserMessage]);
  useEffect(() => {
    if (!messagesEndRef.current) return;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); scrollTimeoutRef.current = null; }, 100);
  }, [fullContent, isGenerating]);

  if (!fullContent.trim() && !isGenerating && showWelcome) {
    return (
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[#F5F5DC] font-bold text-4xl">Pergunte Sobre o Projeto!</h1>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 flex items-start justify-center pt-20 ${className}`}
      style={{ zIndex: 1, pointerEvents: 'none' }}
    >
      <div
        className="relative w-full max-w-4xl p-4 rounded-lg shadow-lg pointer-events-auto"
        style={{ maxHeight: '65vh', overflowY: 'auto' }}
      >
        { (isGenerating || tokenCount > 0) && (
          <div className="text-center mb-2 shrink-0 fixed top-6 left-1/2 transform -translate-x-1/2">
            <span className="text-white text-sm bg-black px-3 py-1 rounded-full">Tokens: {tokenCount}</span>
          </div>
        )}

        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeSanitize]}
          components={markdownComponents}
        >
          {fullContent}
        </ReactMarkdown>

        {isGenerating && showTypingIndicator && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
});
ResBox.displayName = 'ResBox';

export default ResBox;


