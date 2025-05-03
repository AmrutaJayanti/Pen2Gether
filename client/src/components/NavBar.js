import {Link,Outlet} from "react-router-dom";
import './../css/NavBar.css'
function NavBar(){
    return(
        <div className="navbar">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/document">Document</Link></li>
                </ul>
            </nav>
            <Outlet/>
        </div>
    );
}
export default NavBar;