import { Link } from "react-router-dom";
import DecryptionLoader from "./DecryptionLoader";
import "./Cards.css" 

function FundraiserCard({fundraiserData}) {
  const fundraiserLink = `fundraisers/${fundraiserData.id}`;
  const totalRaised = fundraiserData.total_raised || 0;
  const progressPercentage = fundraiserData.goal > 0
    ? Math.min((totalRaised / fundraiserData.goal) * 100, 100)
    : 0;

  return (
    <div className="terminal-card">
      <Link to={fundraiserLink}>
        <div className="card-image-wrapper">
          {fundraiserData.image &&(
          <img 
            src={fundraiserData.image} 
            alt={fundraiserData.title}
            style={{ 
              width: '100%', 
              height: '200px',
              objectFit: 'cover',
              borderRadius: '4px',
              marginBottom: '1rem',
              filter: 'grayscale(50%) brightness(90%)' 
            }} 
          />
          )}
        </div>
        
        <h3 className="card-title">
          <DecryptionLoader targetText={fundraiserData.title} />
        </h3>

        <div className="progress-container">
          <div className="progress-label">
            ALLOCATION_STATUS: {progressPercentage}%
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="deficit-container">
          <div className="deficit-label">
            <span>RESOURCE_TARGET: ${fundraiserData.goal.toLocaleString()} </span>
        </div>
        </div>

        <div className="corporate-btn">
          ACCESS_RECORD
        </div>
      </Link>
    </div>
  );
}

export default FundraiserCard;