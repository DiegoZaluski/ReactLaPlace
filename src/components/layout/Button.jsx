function Button({children, onClick, className, type}) {
    return(
        <div>
            <button onClick={onClick}
            type={type}
            className = {`text-white p-1 rounded-md ${className}`}>{children}</button>
        </div>
    )
}

export default Button 