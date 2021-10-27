import { Link, NavLink } from "react-router-dom";


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
function Navbar() {
    return (
        <nav className="Navigation navbar navbar-expand-md">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    ShareBnB
                </Link>
                <ul className="navbar-nav ms-auto">
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
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;