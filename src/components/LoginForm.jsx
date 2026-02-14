import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import postLogin from "../api/post-login.js";
import useAuth from "../hooks/use-auth.js";
import "./Forms.css"; // Ensure this contains the document styles we created

function LoginForm() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (credentials.username && credentials.password) {
      postLogin(
        credentials.username,
        credentials.password
      ).then((response) => {
        window.localStorage.setItem("token", response.token);
        setAuth({
          token: response.token,
        });
        navigate("/users");
      }).catch(err => {
        // Optional: Trigger the 'screen-glitch' class on body here for "Critical Error" vibe
        console.error("Authentication protocol failed.");
      });
    }
  };

  return (
    <div className="document-container page-fade-in">
      <h2 className="form-title">Authentication Protocol</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label className="form-label" htmlFor="username">
            Employee Identification:
          </label>
          <input 
            className="form-input"
            type="text" 
            id="username" 
            placeholder="ENTER USERNAME"
            onChange={handleChange} 
          />
        </div>

        <div className="form-section">
          <label className="form-label" htmlFor="password">
            Security Passcode:
          </label>
          <input
            className="form-input"
            type="password" 
            id="password" 
            placeholder="********"
            onChange={handleChange}
          />
        </div>

        <button className="corporate-btn" type="submit">
          Initialize Access
        </button>
      </form>

      <div className="terminal-subtext" style={{ marginTop: '2rem', textAlign: 'center' }}>
        Note: Unauthorized access attempts are monitored by the Board.
      </div>
    </div>
  );
}

export default LoginForm;