import {Link,Outlet} from "react-router-dom";
import './../css/NavBar.css'
function NavBar(){
    return(
        <div className="navbar">
            <nav>
                <ul type="none">
                    <li><Link to="/" id="nav-item">Home</Link></li>
                    <li><Link to="/login" id="nav-item">Login</Link></li>
                    <li><Link to="/register" id="nav-item">Register</Link></li>
                </ul>
            </nav>
            <Outlet/>
        </div>
    );
}
export default NavBar;