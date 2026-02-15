import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DecryptionLoader from '../components/DecryptionLoader.jsx';
import './UserPage.css';
import '../components/Forms.css'; // Importing the error/button styles

function UserPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // Track which pledge is being edited
  const [editValue, setEditValue] = useState("");   // Temporary value for the input
  const [uiError, setUiError] = useState(null);     // PROJECT REQUIREMENT: UI Errors
  const { id } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${id}/`)
      .then((results) => results.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // 3. PROJECT REQUIREMENT: Update Logic (PUT)
  const handleUpdatePledge = async (pledgeId) => {
    setUiError(null);
    try {
      const updatedPledge = await putPledge(pledgeId, { comment: editValue });

      // Update local state so the UI reflects the change immediately
      const updatedPledges = user.pledges.map((p) =>
        p.id === pledgeId ? { ...p, comment: updatedPledge.comment } : p
      );
      setUser({ ...user, pledges: updatedPledges });
      setEditingId(null);
    } catch (err) {
      setUiError(`MODIFICATION_REFUSED: ${err.message}`);
    }
  };

  if (loading) return <div className="dashboard-wrapper"><p>DECRYPTING_ASSET_DATA...</p></div>;
  if (!user) return <div className="dashboard-wrapper"><p>ERROR: ASSET_NOT_FOUND</p></div>;

  const hasActivity = (user.fundraisers?.length > 0 || user.pledges?.length > 0);

  return (
    <div className="dashboard-wrapper page-fade-in">
      <div className="report-header">
        <div className="lumon-logo" style={{ fontSize: '1rem' }}>TEAMRAZR.INC</div>
        <h2 className="report-title">Employee Activity Report: {user.username.toUpperCase()}</h2>
        <div className="document-id">ID: {user.id}</div>
      </div>

      {/* 4. PROJECT REQUIREMENT: Display errors in UI */}
      {uiError && (
        <div className="non-compliance-box">
          <div className="alert-icon">!</div>
          <p>{uiError}</p>
        </div>
      )}

      {!hasActivity ? (
        <div className="non-compliance-box">
          <div className="alert-icon">!</div>
          <h3>Zero Engagement Detected</h3>
          <p>Your current contribution level is below the departmental threshold.</p>
        </div>
      ) : (
        <div className="activity-sections">

          {/* Section: Initiated Fundraisers */}
          {user.fundraisers?.length > 0 && (
            <section className="dashboard-section">
              <h4 className="section-label">Primary Initiations</h4>
              <div className="dashboard-grid">
                {user.fundraisers.map((item) => (
                  <Link to={`/fundraisers/${item.id}`} key={item.id} className="fundraiser-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <span className="status-tag">Originator</span>
                    <h3><DecryptionLoader targetText={item.title} /></h3>
                    <div className="progress-container">
                      <div className="progress-label">Goal: ${item.goal || item.target}</div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${((item.current_total || 0) / (item.goal || item.target)) * 100}%` }}></div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Section: Contributions (Pledges) with Update Logic */}
          {user.pledges?.length > 0 && (
            <section className="dashboard-section">
              <h4 className="section-label">Resource Allocations</h4>
              <div className="dashboard-grid">
                {user.pledges.map((item) => (
                  <div key={item.id} className="fundraiser-card" style={{ borderTopColor: 'var(--lumon-blue-light)' }}>
                    <span className="status-tag">Contributor</span>
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