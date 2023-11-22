
export default function FlexWrapContainer({children}: any){
    return (
        <div className="flex flex-wrap gap-4">
            {children}
        </div>
    )
}