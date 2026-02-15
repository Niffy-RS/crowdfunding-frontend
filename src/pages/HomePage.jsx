import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";

function HomePage() {
  const { fundraisers } = useFundraisers();

  return (
    <div className="dashboard-wrapper page-fade-in">
      <header className="directory-status">
        <div>
          <span className="directory-label">System State: </span>
          <span style={{ color: 'var(--lumon-blue-dark)', fontWeight: 'bold' }}>OPERATIONAL</span>
        </div>
        <div className="directory-label">
            TOTAL_PROJECTS_RETRIEVED: {fundraisers.length}
        </div>
      </header>

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