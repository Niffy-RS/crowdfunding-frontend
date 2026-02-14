import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DecryptionLoader from '../components/DecryptionLoader.jsx';
import './UserPage.css';

function UserPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Extracts the ID from /users/:id

  useEffect(() => {
    // Fetch user data from your Heroku backend
    fetch(`${import.meta.env.VITE_API_URL}/users/${id}/`)
      .then((results) => results.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="dashboard-wrapper"><p>DECRYPTING_ASSET_DATA...</p></div>;
  if (!user) return <div className="dashboard-wrapper"><p>ERROR: ASSET_NOT_FOUND</p></div>;

  // Map backend data to your UI logic
  // Assumes your Serializer returns 'pledges' and 'fundraisers'
  const hasActivity = (user.fundraisers?.length > 0 || user.pledges?.length > 0);

  return (
    <div className="dashboard-wrapper page-fade-in">
      <div className="report-header">
        <div className="lumon-logo" style={{ fontSize: '1rem' }}>TEAMRAZR.INC</div>
        <h2 className="report-title">Employee Activity Report: {user.username.toUpperCase()}</h2>
        <div className="document-id">ID: {user.id}</div>
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
          {user.fundraisers?.length > 0 && (
            <section className="dashboard-section">
              <h4 className="section-label">Primary Initiations</h4>
              <div className="dashboard-grid">
                {user.fundraisers.map((item) => (
                  <div key={item.id} className="fundraiser-card">
                    <span className="status-tag">Originator</span>
                    <h3><DecryptionLoader targetText={item.title} /></h3>
                    <div className="progress-container">
                      <div className="progress-label">Goal: ${item.goal}</div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${(item.current_total / item.goal) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Contributions (Pledges) */}
          {user.pledges?.length > 0 && (
            <section className="dashboard-section">
              <h4 className="section-label">Resource Allocations</h4>
              <div className="dashboard-grid">
                {user.pledges.map((item) => (
                  <div key={item.id} className="fundraiser-card" style={{ borderTopColor: 'var(--lumon-blue-light)' }}>
                    <span className="status-tag">Contributor</span>
                    {/* Accessing the fundraiser title via the nested pledge data */}
                    <h3><DecryptionLoader targetText={item.fundraiser_title || "PLEDGE_RECORD"} /></h3>
                    <p className="amount-text">Contribution: ${item.amount}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default UserPage;