interface Props{
    children:string
}

export default function Category({children}:Props){
    return(
        <h3 className="category">{children}</h3>
    )
}