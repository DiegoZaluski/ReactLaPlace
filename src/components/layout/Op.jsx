function Op({className = '', children}) {
    return (
        <div className={`absolute top-0 z-10 grid w-screen h-52 bg-gradient-to-r bg-[rgba(245,245,245,0.5)] p-5  text-center text-2xl transition-all duration-300 ease-in-out shadow-b-xl ${className}`}>
            {children || "LaPlace"}
        </div>
    );
}

export default Op