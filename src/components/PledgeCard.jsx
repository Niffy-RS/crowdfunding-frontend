import { Link } from "react-router-dom";
import "./src/style.css";

function PledgeCard(props) {
  const { pledgeData } = props;
  const pledgeLink = `pledge/${pledgeData.id}`;

  return (
    <div className="pledge-card">
      <Link to={pledgeLink}>
        <img src={pledgeData.image} />
        <h3>{pledgeData.title}</h3>
      </Link>
    </div>
  );
}

export default PledgeCard;