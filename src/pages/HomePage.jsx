import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css"; // Using the new terminal styling

function HomePage() {
  const { fundraisers } = useFundraisers();

  return (
    <div className="dashboard-wrapper page-fade-in">
      {/* System Status Header */}
      <header className="directory-status">
        <div>
          <span className="directory-label">System State: </span>
          <span style={{ color: 'var(--lumon-blue-dark)', fontWeight: 'bold' }}>OPERATIONAL</span>
        </div>
        <div className="directory-label">
            TOTAL_PROJECTS_RETRIEVED: {fundraisers.length}
        </div>
      </header>

      {/* The Grid Container */}
      <div id="fundraiser-list" className="terminal-grid">
        {fundraisers.map((fundraiserData, key) => {
          return (
            <FundraiserCard 
              key={key} 
              fundraiserData={fundraiserData} 
            />
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;