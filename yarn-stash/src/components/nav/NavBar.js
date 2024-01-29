import { Link } from "react-router-dom";
import "./NavBar.css"


export const NavBar = () => {
    return <ul className="navbar">
        <li className="navbar-item">
            <Link to='/yarns'>Show All Yarn</Link>
        </li>
        <li className="navbar-item">
            <Link>Add New Yarn</Link>
        </li>
        <li className="navbar-item">
            <Link>Profile</Link>
        </li>
        <li className="navbar-item">
            <Link>Logout</Link>
        </li>
    </ul>
}