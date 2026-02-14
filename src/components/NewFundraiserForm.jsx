import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postFundraiser from "../api/post-fundraiser.js"

function NewFundraiserForm() {
const navigate = useNavigate();

const [credentials, setCredentials] = useState({
    title: "",
    description: "",
    goal: "",
    image: "",
});

const handleChange = (event) => {
    const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [id]: value,
        }));
};

const handleSubmit = (event) => {
    event.preventDefault();
        if (credentials.title && credentials.description && credentials.goal && credentials.image) {
            postProject(
            credentials.title,
            credentials.description, 
            credentials.goal, 
            credentials.image
        ).then((response) => {
            navigate("/user");
        });
    }
};

    return (
        <form>
            <div>
                <label htmlFor="Title">Title:</label>              
                <input
                type="text"
                id="title"
                placeholder="Type your TeamRazr name"
                onChange={handleChange}
            />
            </div>

            <div>
                <label htmlFor="description">Description:</label>
                <input
                type="description"
                id="description"
                placeholder="Type the TeamRazr description"
                onChange={handleChange}
            />
            </div>

            <div>
                <label htmlFor="goal">Target Amount:</label>
                <input
                type="goal"
                id="goal"
                placeholder="$"
                onChange={handleChange}
            />
            </div>

            <div>
                <label htmlFor="image">Image:</label>
                <input
                type="text"
                id="image"
                placeholder="Project Image URL"
                onChange={handleChange}
            />
            </div>

            <button type="submit" onClick={handleSubmit}>
                Submit
            </button>
        </form>
    );
}

export default NewFundraiserForm;