import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import useAuth from "../hooks/use-auth";
import deleteFundraiser from "../api/delete-fundraiser";
import DecryptionLoader from "../components/DecryptionLoader";
import NotFound from "./404Page";
import "./HomePage.css";

function FundraiserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { fundraiser, isLoading, error } = useFundraiser(id);

  // Permission Logic
  const canModifyFundraiser = Boolean(auth.token) && (
    auth.username === 'superniffy' ||
    Number(auth.user_id) === Number(fundraiser?.owner)
  );

  function handleDelete() {
    if (window.confirm("URGENT: Are you sure you want to terminate this resource drive?")) {
      deleteFundraiser(fundraiser.id)
        .then(() => navigate("/"))
        .catch((err) => alert("TERMINATION_FAILURE: " + err.message));
    }
  }

  if (isLoading) return (
    <div className="dashboard-wrapper"><div className="directory-status">RETRIEVING_DATA_SET...</div></div>
  );

  if (error) return <NotFound />;

  const totalRaised = fundraiser.pledges?.reduce((sum, p) => sum + p.amount, 0) || 0;
  const deficit = fundraiser.goal - totalRaised;
  const progressPercent = Math.round((totalRaised / fundraiser.goal) * 100);

  return (
    <div className="dashboard-wrapper page-fade-in">
      <header className="directory-status">
        <div><span className="directory-label">FILE_REF: </span><strong>{id.toUpperCase()}</strong></div>
        <div className="directory-label">STATUS: {fundraiser.is_open ? "ACTIVE" : "CLOSED"}</div>
      </header>

      <div className="form-document" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div className="document-header">
          <div>
            <div className="document-id">INITIATED: {new Date(fundraiser.date_created).toLocaleDateString()}</div>
            <h2 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>
              <DecryptionLoader targetText={fundraiser.title} />
            </h2>
          </div>
          {/* 3. PROJECT REQUIREMENT: Update/Delete Functionality */}
          {canModifyFundraiser && (
            <div className="admin-actions">
              <button onClick={handleDelete} className="corporate-btn" style={{ backgroundColor: 'var(--alert-red)' }}>
                TERMINATE_DRIVE
              </button>
            </div>
          )}
        </div>

        <div className="form-grid">
          <section>
            <h4 className="section-label">Resource Metrics</h4>
            <div className="deficit-amount" style={{ fontSize: '3rem' }}>
              {deficit > 0 ? deficit.toLocaleString() : "0.00"}
            </div>

            {fundraiser.is_open && (
              <div style={{ margin: '2rem 0' }}>
                <Link to={`/pledges`} className="corporate-btn">CONSOLIDATE_RESOURCES</Link>
              </div>
            )}

            <div className="progress-container">
              <div className="progress-label">CAPACITY: {progressPercent}%</div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: `${progressPercent}%` }}></div></div>
            </div>
          </section>

          <section>
            <h4 className="section-label">Allocation Ledger</h4>
            <div className="ledger-scroll">
              <table style={{ width: '100%', fontFamily: 'IBM Plex Mono' }}>
                <tbody>
                  {fundraiser.pledges.map((pledge, key) => (
                    <tr key={key} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '8px' }}>
                        {/* Corrected Anonymous Logic */}
                        {pledge.anonymous ? "ANONYMOUS_ASSET" : (pledge.supporter_username || "UNKNOWN_SOURCE")}
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>${pledge.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default FundraiserPage;