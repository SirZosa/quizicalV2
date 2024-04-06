interface Props{
    children: string
}
export default function Question({children}:Props){
    return(
        <h2 className="question">{children}</h2>
    )
}