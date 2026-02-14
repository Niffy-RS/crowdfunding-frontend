import React from 'react';
import { useNavigate } from 'react-router-dom';
import './404.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/');
  };

  return (
    <div className="error-page-body page-fade-in">
      {/* The CRT scanline overlay we built earlier */}
      <div className="crt-overlay"></div>
      
      <div className="warning-container">
        <h1 className="error-code">404</h1>
        <div className="lumon-logo">
            LOCATION RESTRICTED
        </div>
        
        <p className="protocol-text">
            You have attempted to access an unmapped sub-level. <br />
            Please remain stationary. Your coordinates have been logged.
        </p>

        <button className="return-btn" onClick={handleReturn}>
          RETURN TO ASSIGNED WORKSTATION
        </button>
      </div>

      <div className="terminal-subtext">
        Ref: [INTERNAL_PROTOCOL_ERR_04]
      </div>
    </div>
  );
};

export default NotFound;