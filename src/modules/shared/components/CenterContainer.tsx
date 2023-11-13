
export default function CenterContainer ({children, className}: any) {
    const aux = `min-h-screen flex items-center justify-center ${className}`

    return (
        <div className={aux}>
            {children}
        </div>
    )
}