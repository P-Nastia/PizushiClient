import {Link} from "react-router-dom";

const NavBar = () => {
    return(
        <nav className=" navbar navbar-dark bg-dark px-4">
            <Link className="navbar-brand" to="/">Pizushi</Link>
            <ul className="navbar-nav flex-row">
                <li className="nav-item me-3">
                    <Link className={"text-white text-decoration-none"}  to="/">
                        Categories
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className={"text-white text-decoration-none"} to="/create">
                        Create
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;