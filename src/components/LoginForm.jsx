import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import postLogin from "../api/post-login.js";
import useAuth from "../hooks/use-auth.js";
import "./Forms.css"; 

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
        window.localStorage.setItem("user_id", response.user_id);
        window.localStorage.setItem("username", credentials.username);
        setAuth({
          token: response.token,
          user_id: response.user_id,
          username: credentials.username,
          is_superuser: credentials.username === 'superniffy'
        });
        navigate(`/users/${response.user_id}`);

      }).catch(err => {
        console.error("Authentication protocol failed.");
      });
    }
  };

  return (
    <div className="document-container page-fade-in">
      <h2 className="form-title">Authentication Protocol</h2>
      
      <form>
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

        <button className="corporate-btn" type="submit" onClick={handleSubmit}>
          Initialize Access
        </button>
      </form>

      <div className="terminal-subtext">
        Note: Unauthorized access attempts are monitored by the Board.
      </div>
    </div>
  );
}

export default LoginForm;