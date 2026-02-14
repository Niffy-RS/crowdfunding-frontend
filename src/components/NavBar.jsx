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
    <div className="navbar-container">
      <div className="crt-overlay"></div>

      <div className="navbar">
      <nav>
        <Link to="/">Terminal_Home</Link>

        {!auth.token && (
        <Link to="/signup">Enrollment</Link>
        )}
        {auth.token ? (
          <>
          <Link to="/users">Dashboard</Link>
          <Link to="/fundraisers">Initiate</Link>
          <Link to="/pledges">Contribute</Link>
          <Link to="/" onClick={handleLogout} style={{color: 'var(--alert-red)'}}>
            Sever_Connection
          </Link>
          </>
          ) : (
          <Link to="/login">Authenticate</Link> 
        )}
      </nav>
      </div>
      <main className="page-fade-in">
        <Outlet />
        </main>
    </div>
  );
}

export default NavBar;
