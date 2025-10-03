import React, { useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSSEConnection } from '../../hooks/useSSEConnection';

import MessageInput from './MessageInput';
import ResBox from './ResBox';

// Custom hook to manage tooltip
const useTooltip = () => {
  const tooltipRef = useRef(null);
  
  const showTooltip = useCallback(() => {
    if (tooltipRef.current) {
      tooltipRef.current.style.opacity = '1';
    }
  }, []);
  
  const hideTooltip = useCallback(() => {
    if (tooltipRef.current) {
      tooltipRef.current.style.opacity = '0';
    }
  }, []);
  
  return { tooltipRef, showTooltip, hideTooltip };
};

// Custom hook for textarea auto-resize
const useAutoResize = () => {
  const textareaRef = useRef(null);
  
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);
  
  return { textareaRef, adjustHeight };
};

// Custom hook to manage chat state
const useChatState = () => {
  const [showOp, setShowOp] = useState(false);
  const [message, setMessage] = useState('');
  // NOVA LINHA: Ref para armazenar a função de adicionar mensagem do ResBox
  const chatRef = useRef(null); 
  
  // Desestruturando isGenerating e stopGeneration (correto)
  const { messages, sendMessage, isConnected, isGenerating, stopGeneration } = useSSEConnection('/api/generate/stream');

  const handleSend = useCallback((messageText) => {
    // 1. NOTIFICA o ResBox para adicionar a mensagem do usuário à conversa
    if (chatRef.current?.addUserMessage) {
        chatRef.current.addUserMessage(messageText);
    }

    // 2. Envia o prompt para a IA
    console.log(`Sending to AI: ${messageText}`);
    sendMessage(messageText);
  }, [sendMessage]);

  const toggleMenu = useCallback(() => {
    setShowOp(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setShowOp(false);
  }, []);

  const handleHeightAdjust = useCallback((height) => {
    console.log('Height adjusted:', height);
  }, []);

  const clearMessage = useCallback(() => {
    setMessage('');
  }, []);

  const updateMessage = useCallback((event) => {
    const value = typeof event === 'string' ? event : event?.target?.value || '';
    setMessage(value);
  }, []);

  React.useEffect(() => {
    if (messages.length > 0) {
      console.log('AI Response:', messages[messages.length - 1]);
    }
  }, [messages]);

  return {
    showOp,
    message,
    toggleMenu,
    closeMenu,
    updateMessage,
    clearMessage,
    handleHeightAdjust,
    handleSend,
    isConnected,
    isGenerating,
    stopGeneration,
    messages,
    chatRef // Exporta a ref para ser passada para o ResBox
  };
};

// Isolated Header component
// POSIÇÃO CORRIGIDA: Definido ANTES do componente Chat.
const ChatHeader = React.memo(({ showOp, onToggleMenu, t }) => (
  <header className="h-20 w-full flex items-center flex-row text-white shadow-b-md z-10">
    <h1 className="ml-5 flex font-playfair">
      <strong>LaPlace</strong>
    </h1>
  </header>
));

// Main Chat component
const Chat = () => {
  const { t, ready } = useTranslation(['auth']);
  const { 
    showOp,
    message,
    toggleMenu,
    closeMenu,
    updateMessage,
    clearMessage,
    handleHeightAdjust,
    handleSend,
    // CORRIGIDO: Desestruturando as props isGenerating e stopGeneration
    isConnected,
    isGenerating, 
    stopGeneration,
    messages,
    chatRef // Importa a ref
  } = useChatState();
  const { tooltipRef, showTooltip, hideTooltip } = useTooltip();
  const { textareaRef, adjustHeight } = useAutoResize();
  
  // Loading state
  if (!ready) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-[#0f0f11] text-white">
        <div className="text-lg">Loading translate...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-wrap justify-center items-center h-screen w-full paddEnv bg-[#0f0f11] p-0 m-0 noScroll">
      
      {/* Header */}
      <ChatHeader 
        showOp={showOp}
        onToggleMenu={toggleMenu}
        t={t}
      />
      
      {/* Main Content Area */}
      <div
        onClick={closeMenu}
        className="flex flex-col justify-end items-center flex-1 w-full bg-[#0f0f11]"
        role="main"
      >
        {/* Welcome Message */}
        <ResBox 
          messages={messages}
          isGenerating={isGenerating} 
          showTypingIndicator={true}
          showWelcome={true}
          // NOVA LINHA: Usa a prop onUserMessage para injetar a função addUserMessage
          // dentro da chatRef, permitindo que o useChatState a chame.
          onUserMessage={(addFunc) => chatRef.current = { addUserMessage: addFunc }} 
        />
        
        {/* Input Container */}
        <MessageInput 
         textareaRef={textareaRef}
         value={message}
         onChange={updateMessage}
         placeholder={t('question')}
         onHeightAdjust={adjustHeight}
         onClear={clearMessage}
         onSend={handleSend} 
         tooltipRef={tooltipRef}
         showTooltip={showTooltip}
         hideTooltip={hideTooltip}
         isGenerating={isGenerating} 
         stopGeneration={stopGeneration} 
         />
      </div>
      
      {/* Footer */}
      <footer className="flex items-center justify-center h-10 w-full text-white bg-[#0f0f11] text-sm">
        <span>LaPlace&trade;</span>
      </footer>
      
    </div>
  );
};


// Add displayName for debugging
Chat.displayName = 'Chat';
ChatHeader.displayName = 'ChatHeader';
MessageInput.displayName = 'MessageInput';

export default Chat;