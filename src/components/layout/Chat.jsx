import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Menu, X, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useSSEConnection } from '../../hooks/useSSEConnection';
import Button from './Button';
import ChatOp from './ChatOp';
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
  const { messages, sendMessage, isConnected } = useSSEConnection('/api/generate/stream');

  const handleSend = useCallback((messageText) => {
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
    messages
  };
};

// Isolated Header component
const ChatHeader = React.memo(({ showOp, onToggleMenu, t }) => (
  <header className="h-20 w-full flex items-center flex-row text-white shadow-b-md z-10">
    <div className="flex flex-col h-auto w-auto items-center justify-center shadow-md translate-x-2 active:bg-gray-500 rounded-md ml-10">
      <Button
        onClick={onToggleMenu}
        className="h-14 w-14 flex items-center justify-center"
        aria-label={showOp ? t('close_menu') : t('open_menu')}
      >
        {showOp ? (
          <X className="text-white h-6 w-6" />
        ) : (
          <Menu className="text-white h-6 w-6" />
        )}
      </Button>
    </div>
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
    isConnected,
    messages
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
    <div className="flex flex-col flex-wrap justify-center items-center h-screen w-full paddEnv bg-[#0f0f11] p-0 m-0 noScroll bgImg">
      
      {/* Chat Options Sidebar */}
      <ChatOp 
        className={`transition-transform duration-300 ease-in-out ${
          showOp ? 'translate-x-0' : 'translate-x-[-100%]'
        }`}
      />
      
      {/* Header */}
      <ChatHeader 
        showOp={showOp}
        onToggleMenu={toggleMenu}
        t={t}
      />
      
      {/* Main Content Area */}
      <div
        onClick={closeMenu}
        className="flex flex-col justify-end items-center flex-1 w-full bg-[#0f0f11] bgImg"
        role="main"
      >
        {/* Welcome Message */}
        <ResBox 
          messages={messages}
          isGenerating={isConnected}
          showTypingIndicator={true}
          showWelcome={true}
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
         hideTooltip={hideTooltip}/>
      </div>
      
      {/* Footer */}
      <footer className="flex items-center justify-center h-10 w-full text-white bgImg bg-[#0f0f11] text-sm">
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