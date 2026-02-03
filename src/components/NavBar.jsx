import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import "./NavBar.css";

function NavBar() {
  const {auth, setAuth} = useAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
  };

  console.log(auth)

  return (
    <div className="navbar">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        {auth.token ? (
          <div>
          <Link to="/user">Your Profile</Link>
          <Link to="/" onClick={handleLogout}>
            Log Out
          </Link>
          </div>
          ) : (
          <Link to="/login">Login</Link> 
        )}
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
