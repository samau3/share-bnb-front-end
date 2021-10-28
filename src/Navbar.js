import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./UserContext";

/** Navigation bar that will show up on all pages
 * 
 *  Props:
 *  - None
 * 
 *  State:
 *  - None
 * 
 *  App -> Navbar
 * 
 */
function Navbar({ handleLogout }) {
    const currentUser = useContext(UserContext);

    return (
        <nav className="Navigation navbar navbar-expand-md">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    ShareBnB
                </Link>
                {currentUser && <ul className="navbar-nav ms-auto">
                    <li className="nav-item me-4">
                        <NavLink className="nav-link" to="/listings">
                            Listings
                        </NavLink>
                    </li>
                    <li className="nav-item me-4">
                        <NavLink className="nav-link" to="/addListing">
                            Add New Listing
                        </NavLink>
                    </li>
                    <li className="nav-item me-4">
                        <NavLink className="nav-link" to="/logout" onClick={handleLogout}>
                            Logout
                        </NavLink>
                    </li>
                </ul>}
                {!currentUser && <ul className="navbar-nav ms-auto">
                    <li className="nav-item me-4">
                        <NavLink className="nav-link" to="/signup">
                            Sign Up
                        </NavLink>
                    </li>
                    <li className="nav-item me-4">
                        <NavLink className="nav-link" to="/login">
                            Login
                        </NavLink>
                    </li>
                </ul>}
            </div>
        </nav>
    );
}

export default Navbar;