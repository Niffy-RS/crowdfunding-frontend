import { useParams, Link } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import DecryptionLoader from "../components/DecryptionLoader";
import "./HomePage.css"; // Reusing the terminal grid and card styles

function FundraiserPage() {
  const { id } = useParams();
  const { fundraiser, isLoading, error } = useFundraiser(id);

  if (isLoading) {
    return (
      <div className="dashboard-wrapper page-fade-in">
        <div className="directory-status">
          <span className="directory-label">RETRIEVING_DATA_SET...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-wrapper page-fade-in">
        <div className="non-compliance-box">
          <div className="alert-icon">!</div>
          <h3>PROTOCOL_ERROR</h3>
          <p>{error.message || "Unauthorized access or missing record."}</p>
        </div>
      </div>
    );
  }

  // Calculate stats for the header
  const deficit = fundraiser.target - fundraiser.current;
  const progressPercent = Math.round((fundraiser.current / fundraiser.target) * 100);

  return (
    <div className="dashboard-wrapper page-fade-in">
      {/* Dossier Header */}
      <header className="directory-status">
        <div>
          <span className="directory-label">FILE_REFERENCE: </span>
          <span style={{ color: 'var(--lumon-blue-dark)', fontWeight: 'bold' }}>
            {id.toUpperCase()}
          </span>
        </div>
        <div className="directory-label">
          STATUS: {fundraiser.is_open ? "ACTIVE_COLLECTION" : "CLOSED_FILE"}
        </div>
      </header>

      <div className="form-document" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div className="document-header">
          <div>
            <div className="document-id">INITIATED: {new Date(fundraiser.date_created).toLocaleDateString()}</div>
            <h2 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>
                <DecryptionLoader targetText={fundraiser.title} />
            </h2>
          </div>
          <div className="lumon-logo">TEAMRAZR</div>
        </div>

        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          
          {/* Left Column: Metrics */}
          <section>
            <h4 className="section-label">Resource Metrics</h4>
            <div className="deficit-container" style={{ border: 'none', padding: 0 }}>
              <span className="deficit-label">Current Resource Deficit:</span>
              <span className="deficit-amount" style={{ fontSize: '3rem' }}>
                {deficit > 0 ? deficit.toLocaleString() : "0.00"}
              </span>
            </div>
            
            {fundraiser.is_open && (
              <div style={{ marginTop: '3rem' }}>
                <Link 
                  to={`/pledge/${id}`} 
                  className="corporate-btn" 
                  style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
                >
                  CONSOLIDATE_RESOURCES (PLEDGE)
                </Link>
                <p className="terminal-subtext" style={{ marginTop: '0.5rem' }}>
                  AWAITING_INPUT: Authorized assets only.
                </p>
              </div>
            )}
            <div className="progress-container" style={{ marginTop: '2rem' }}>
                <div className="progress-label">ALLOCATION_CAPACITY: {progressPercent}%</div>
                <div className="progress-bar" style={{ height: '15px' }}>
                    <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>
          </section>

          {/* Right Column: Ledger */}
          <section>
            <h4 className="section-label">Allocation Ledger (Pledges)</h4>
            <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid var(--border-color)', padding: '10px' }}>
                {fundraiser.pledges.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', fontFamily: 'IBM Plex Mono' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--office-grey)', textAlign: 'left' }}>
                                <th style={{ padding: '8px' }}>SOURCE</th>
                                <th style={{ padding: '8px', textAlign: 'right' }}>AMOUNT</th>
                            </tr>
                        </thead>
                  <tbody>
                    {fundraiser.pledges.map((pledgeData, key) => {
                      // Determine the display name based on corporate compliance (anonymous flag)
                      const displayName = pledgeData.anonymous
                        ? "ANONYMOUS_ASSET"
                        : (pledgeData.supporter?.username || pledgeData.supporter?.first_name || "UNKNOWN_SOURCE");

                      return (
                        <tr key={key} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '8px' }}>
                            {displayName.toUpperCase()}
                          </td>
                          <td style={{ padding: '8px', textAlign: 'right' }}>
                            ${pledgeData.amount.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                    </table>
                ) : (
                    <p className="terminal-subtext">NO_RESOURCES_ALLOCATED_YET</p>
                )}
            </div>
          </section>

          {/* Description Area */}
          <section className="full-width" style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
            <h4 className="section-label">Operational Brief</h4>
            <p style={{ lineHeight: '1.6', color: 'var(--text-main)' }}>{fundraiser.description}</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default FundraiserPage;