import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import "./NavBar.css";

function NavBar() {
  const {auth, setAuth} = useAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user_id");
    window.localStorage.removeItem("is_superuser");
    setAuth({ 
      token: null, 
      user_id: null,
      is_superuser: false 
    });
  };

  return (
    <div className="navbar-container">
      <div className="crt-overlay"></div>
      <div className="navbar">
      <nav>
          <Link to="/">Terminal_Home</Link>

          {auth.token ? (
            <>
              <Link to="/fundraisers">Initiate_Drive</Link>
              <Link to={`/users/${auth.user_id}`}>My_Dashboard</Link>

              <button onClick={handleLogout} className="logout-btn">
                Sever_Connection
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Authenticate</Link>
              <Link to="/signup">Enroll</Link>
            </>
          )};
      </nav>
      </div>
      <main className="page-fade-in">
        <Outlet />
        </main>
    </div>
  );
}

export default NavBar;
