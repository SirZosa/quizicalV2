interface Props{
    goToMenu:()=>void
}
export default function Navbar({goToMenu}:Props){
    return(
        <nav className="navbar">
                <div className="navbar-content">
                    <h3 className="navbar-logo" onClick={()=>goToMenu()}>Quizical V2</h3>
                    <button className="navbar-btn btn" onClick={()=>goToMenu()}>Menu</button>
                </div>
        </nav>
    )
}