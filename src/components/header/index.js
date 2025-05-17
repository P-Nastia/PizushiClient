import {Link,NavLink} from "react-router-dom";

const Header = () => {
    return(
        <nav className=" navbar navbar-dark bg-dark px-4">
            <Link className="navbar-brand" to="/">Pizushi</Link>
            <ul className="navbar-nav flex-row">
                <li className="nav-item me-3">
                    <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/categories">
                        Categories
                    </NavLink>
                </li>

            </ul>
        </nav>
    )
}

export default Header;