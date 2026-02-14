import { useParams } from "react-router-dom";
import NewPledgeForm from "../components/NewPledgeForm";

function NewPledgePage() {
  const { id } = useParams();
  return <NewPledgeForm projectID={id} />;
}

export default NewPledgePage;