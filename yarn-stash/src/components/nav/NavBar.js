import { Link, Navigate } from "react-router-dom";
import "./NavBar.css"


export const NavBar = () => {
    return <ul className="navbar">
        <li className="navbar-item">
            <Link to='/yarns'>Show All Yarn</Link>
        </li>
        <li className="navbar-item">
            <Link to='/new-yarn'>Add New Yarn</Link>
        </li>
        <li className="navbar-item">
            <Link to='/profile'>Profile</Link>
        </li>
        {localStorage.getItem("yarn_user") ? (
            <li className="navbar-item">
            <Link 
                to=""
                onClick={()=>{
                    localStorage.removeItem("yarn_user")
                    Navigate("/login", { replace: true })
                }}
                >Logout</Link>
                </li>
        ):(
            ""
        )}







        <li className="navbar-item">
            <Link to='/'>Home</Link>
        </li>
    </ul>
}