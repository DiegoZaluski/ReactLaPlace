function Button({children, onClick, className, type}) {
    return(
        <div>
            <button onClick={onClick}
            type={type}
            className = {`border text-white p-2 rounded-md ${className}`}>{children}</button>
        </div>
    )
}

export default Button 