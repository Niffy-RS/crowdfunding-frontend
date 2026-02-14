import { Link } from "react-router-dom";
import DecryptionLoader from "./DecryptionLoader";
import "./Cards.css" // Ensure this contains the styles we created

function FundraiserCard(props) {
  const { fundraiserData } = props;
  const fundraiserLink = `/fundraisers/:id/${fundraiserData.id}`;

  // Calculate the Resource Deficit
  const deficit = fundraiserData.target - fundraiserData.current;
  const progressPercent = Math.round((fundraiserData.current / fundraiserData.target) * 100);

  return (
    <div className="terminal-card">
      <Link to={fundraiserLink} style={{ textDecoration: 'none', color: 'inherit' }}>
        {/* Corporate Image/File Preview */}
        <div className="card-image-wrapper">
          <img 
            src={fundraiserData.image} 
            alt="Resource Preview" 
            style={{ width: '100%', filter: 'grayscale(50%) brightness(90%)' }} 
          />
        </div>

        <span className="card-category">
          Subject: {fundraiserData.category || "GENERAL_ASSET"}
        </span>
        
        <h3 className="card-title">
          <DecryptionLoader targetText={fundraiserData.title} />
        </h3>

        <div className="progress-container">
          <div className="progress-label">
            ALLOCATION_STATUS: {progressPercent}%
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="deficit-container">
          <span className="deficit-label">RESOURCE_DEFICIT:</span>
          <span className="deficit-amount">
            {deficit > 0 ? deficit.toLocaleString() : "0.00"}
          </span>
        </div>

        <div className="corporate-btn" style={{ marginTop: '1.5rem', fontSize: '0.7rem' }}>
          ACCESS_RECORD
        </div>
      </Link>
    </div>
  );
}

export default FundraiserCard;