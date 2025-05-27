import {Link,NavLink} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const Header = () => {
    const token = localStorage.getItem("token");
    let userName = null;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            userName = decoded.name;
        } catch (e) {
            console.error("Invalid token", e);
        }
    }

    return (
        <nav className="navbar navbar-dark bg-dark px-4">
            <Link className="navbar-brand" to="/">Pizushi</Link>
            <ul className="navbar-nav flex-row">
                <li className="nav-item me-3">
                    <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/categories">
                        Categories
                    </NavLink>
                </li>
                <li className="nav-item me-3">
                    {userName ? (
                        <span className="nav-link text-white">{userName}</span>
                    ) : (
                        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/account/login">
                            Login
                        </NavLink>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Header;