import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import postUser from "../api/post-user.js";
import "./Forms.css";

function SignupForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
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
    console.log("form submitted")
    const { username, password, first_name, last_name, email } = credentials;

    if (!username || !password || !first_name || !last_name || !email) {
      alert("PROTOCOL_VIOLATION: Required fields absent.");
      return;
    }

    postUser(username, password, first_name, last_name, email)
      .then((response) => {
        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("user_id", response.user_id);
        setAuth({
          token: response.token,
          user_id: response.user_id
        });
        navigate(`users/${response.user_id}`);
      })
      .catch((error) => {
        console.error("Enrollment error:", error);
        alert("AUTHORISATION_FAILED: resubmit request")
      });
  };

  return (
    <div className="document-container page-fade-in">
      <h2 className="form-title">Enrollment Application</h2>
      
      <p className="terminal-subtext">
        Existing assets: <Link to="/login">RE-AUTHENTICATE</Link>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label className="form-label" htmlFor="username">Assigned Username</label>
          <input 
            className="form-input"
            type="text" 
            id="username" 
            placeholder="UNIQUE_IDENTIFIER"
            onChange={handleChange} 
          />
        </div>

        <div className="form-section">
          <label className="form-label" htmlFor="password">Security Passcode</label>
          <input
            className="form-input"
            type="password" 
            id="password" 
            placeholder="STRICT_CONFIDENTIALITY"
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div className="form-section">
            <label className="form-label" htmlFor="first_name">Legal First Name</label>
            <input
              className="form-input"
              type="text"
              id="first_name"
              placeholder="FIRST_NAME"
              onChange={handleChange}
            />
          </div>
          <div className="form-section">
            <label className="form-label" htmlFor="last_name">Legal Last Name</label>
            <input
              className="form-input"
              type="text"
              id="last_name"
              placeholder="LAST_NAME"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-section">
          <label className="form-label" htmlFor="email">Communication Channel (Email)</label>
          <input
            className="form-input"
            type="email"
            id="email"
            placeholder="USER@CORPORATION.COM"
            onChange={handleChange}
          />
        </div>

        <button className="corporate-btn" type="submit">
          Initialize Enrollment
        </button>
      </form>

      <div className="terminal-subtext">
        Disclaimer: By clicking submit, you acknowledge your intent to provide data refinement for the collective good.
      </div>
    </div>
  );
}

export default SignupForm;