function ChatOp({ className = '', children }) {
    return (
        <div 
            className={`
                fixed top-20 left-0 z-10 w-64 h-56
                bg-[#181819]
                p-4 overflow-hidden shadow-2xl
                rounded-br-2xl
                border-r border-gray-800/50
                transition-all duration-500 ease-out
                ${className}
            `}
        >
            <div className="h-full flex flex-col">
                <div className="border-b border-gray-800/50 pb-3 mb-4">
                </div>
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ChatOp;