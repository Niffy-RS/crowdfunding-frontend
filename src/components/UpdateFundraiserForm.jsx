import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import putFundraiser from "../api/put-fundraiser.js"


function UpdateFundraiserForm(props) {
  const { fundraiser } = props;
  const navigate = useNavigate();
  const { auth } = useAuth();


  const canEdit = Boolean(auth.token) && (
    auth.username === 'superniffy' || // Superuser check
    Number(auth.user_id) === Number(fundraiser?.owner) // Project owner check
  );

  const [fundraiserData, setFundraiserData] = useState({
    title: fundraiser.title,
    description: fundraiser.description,
    goal: fundraiser.goal,
    image: fundraiser.image,
    creator_name: fundraiser.creator_name || ''
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFundraiserData((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canEdit) {
      alert("You don't have permission to edit this project");
      return;
    }

    if (fundraiserData.title && fundraiserData.description && fundraiserData.goal && fundraiserData.image) {
      putFundraiser(
        fundraiserData.title,
        fundraiserData.description,
        fundraiserData.goal,
        fundraiserData.image,
        fundraiser.id
      ).then((response) => {
        navigate("/");
      }).catch(error => {
        alert("Error updating project: " + error.message);
      });
    }
  };

  if (!canEdit) return null;

  return (
    <form>
      <div>
        <label htmlFor="Title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter fundraiser Title"
          value={fundraiserData.title}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="description">Fundraiser Description:</label>
        <AutoResizeTextArea
          id="description"
          value={fundraiserData.description}
          onChange={handleChange}
          placeholder="Fundraiser description"
        />
      </div>

      <div>
        <label htmlFor="goal">Goal:</label>
        <input
          type="goal"
          id="goal"
          placeholder="$"
          value={fundraiserData.goal}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="text"
          id="image"
          placeholder="Fundraiser Image URL"
          value={fundraiserData.image}
          onChange={handleChange}
        />
      </div>

      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default UpdateFundraiserForm;