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
        <Link to="/signup">Start Your TeamRazr</Link>
        {auth.token ? (
          <>
          <Link to="/user">Dashboard</Link>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
          </>
          ) : (
          <Link to="/login">Login</Link> 
        )}
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
