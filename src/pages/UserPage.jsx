import React from 'react';
import DecryptionLoader from '../components/DecryptionLoader.jsx'; // The effect we built earlier
import './UserPage.css';

function UserPage({ userActivities }) {
  // Mock check for activities
  const hasActivity = userActivities && (userActivities.initiated.length > 0 || userActivities.pledged.length > 0);

  return (
    <div className="dashboard-wrapper page-fade-in">
      <div className="report-header">
        <div className="lumon-logo" style={{ fontSize: '1rem' }}>TEAMRAZR.INC</div>
        <h2 className="report-title">Employee Activity Report</h2>
        <div className="document-id">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
      </div>

      {!hasActivity ? (
        <div className="non-compliance-box">
          <div className="alert-icon">!</div>
          <h3>Zero Engagement Detected</h3>
          <p>Your current contribution level is below the departmental threshold. Please initiate a project or allocate resources to remain compliant.</p>
        </div>
      ) : (
        <div className="activity-sections">
          
          {/* Section: Initiated Fundraisers */}
          <section className="dashboard-section">
            <h4 className="section-label">Primary Initiations</h4>
            <div className="dashboard-grid">
              {userActivities.initiated.map((item) => (
                <div key={item.id} className="fundraiser-card">
                  <span className="status-tag">Originator</span>
                  <h3><DecryptionLoader targetText={item.title} /></h3>
                  <div className="progress-container">
                    <div className="progress-label">Goal: ${item.target}</div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${(item.current / item.target) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Contributions */}
          <section className="dashboard-section">
            <h4 className="section-label">Resource Allocations</h4>
            <div className="dashboard-grid">
              {userActivities.pledged.map((item) => (
                <div key={item.id} className="fundraiser-card" style={{ borderTopColor: 'var(--lumon-blue-light)' }}>
                  <span className="status-tag">Contributor</span>
                  <h3><DecryptionLoader targetText={item.fundraiserTitle} /></h3>
                  <p className="amount-text">Contribution: ${item.amount}</p>
                </div>
              ))}
            </div>
          </section>
          
        </div>
      )}
    </div>
  );
}

export default UserPage;