import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Menu, X, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import Button from './Button';
import ChatOp from './ChatOp';

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
  
  const toggleMenu = useCallback(() => {
    setShowOp(prev => !prev);
  }, []);
  
  const closeMenu = useCallback(() => {
    setShowOp(false);
  }, []);
  
  const updateMessage = useCallback((value) => {
    setMessage(value);
  }, []);
  
  const clearMessage = useCallback(() => {
    setMessage('');
  }, []);
  
  return {
    showOp,
    message,
    toggleMenu,
    closeMenu,
    updateMessage,
    clearMessage
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

// Isolated Tooltip component
const ClearTooltip = React.memo(({ tooltipRef, t }) => (
  <span
    id="clear"
    ref={tooltipRef}
    className="w-28 flex items-center justify-center self-center translate-y-[-100%] mb-2 px-2 py-2 rounded bg-black text-white text-xs whitespace-nowrap opacity-0 transition-opacity duration-300 pointer-events-none"
    role="tooltip"
  >
    {t('clear')}
  </span>
));

// Isolated Clear button component
const ClearButton = React.memo(({ onMouseEnter, onMouseLeave }) => (
  <button
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="flex w-14 h-12 rounded-md sx bottom-2 transform -translate-y-1/2 items-center justify-center self-center relative"
    aria-label="Clear message"
    type="button"
  >
    <Plus className="text-white hover:text-red-500 transition-colors duration-200" />
  </button>
));

// Isolated Textarea component
const MessageInput = React.memo(({ 
  textareaRef, 
  value, 
  onChange, 
  placeholder,
  onHeightAdjust 
}) => (
  <textarea
    ref={textareaRef}
    placeholder={placeholder}
    value={value}
    onChange={(e) => {
      onChange(e.target.value);
      onHeightAdjust();
    }}
    className="w-full min-h-[9rem] max-h-40 bg-transparent outline-none caret-white text-white border border-[#F5F5DC] border-b-2 rounded-3xl p-4 pr-12 resize-none overflow-hidden shadow-b-xl transition-all duration-200"
    rows="1"
    style={{ scrollbarWidth: 'none' }}
    aria-label="Type your message"
  />
));

// Main Chat component
const Chat = () => {
  const { t, ready } = useTranslation(['auth']);
  const { showOp, message, toggleMenu, closeMenu, updateMessage } = useChatState();
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
        <h1 
          className="text-[#F5F5DC] font-bold absolute top-1/2 text-4xl font-playfair text-center px-4"
          aria-level="1"
        >
          Pergunte Sobre o Projeto!
        </h1>
        
        {/* Input Container */}
        <div className="flex flex-col relative w-80 xl:w-1/3 md:w-2/4 -translate-y-16">
          
          {/* Clear Tooltip */}
          <ClearTooltip tooltipRef={tooltipRef} t={t} />
          
          {/* Clear Button */}
          <ClearButton 
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
          />
          
          {/* Message Input */}
          <MessageInput
            textareaRef={textareaRef}
            value={message}
            onChange={updateMessage}
            placeholder={t('question')}
            onHeightAdjust={adjustHeight}
          />
          
        </div>
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
ClearTooltip.displayName = 'ClearTooltip';
ClearButton.displayName = 'ClearButton';
MessageInput.displayName = 'MessageInput';

export default Chat;