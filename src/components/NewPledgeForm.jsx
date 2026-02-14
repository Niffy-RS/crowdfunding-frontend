import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postPledge from "../api/post-pledge.js"

function NewPledgeForm(props) {
const navigate = useNavigate();
const {fundraiserId}=props;
const [credentials, setCredentials] = useState({
    amount: "",
    comment: "",
    anonymous: false,
    fundraiser: fundraiserId
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
        if (credentials.amount && credentials.comment) {
            postPledge(
                credentials.amount,
                credentials.comment,  
                credentials.anonymous,  
                credentials.fundraiser
        ).then((response) => {
            navigate("/user");
        });
    }
};

    return (
        <form>
            <div>
                <label htmlFor="Amount">Amount:</label>              
                <input
                type="amount"
                id="amount"
                placeholder="$"
                onChange={handleChange}
            />
            </div>

            <div>
                <label htmlFor="comment">Comment:</label>
                <input
                type="comment"
                id="comment"
                placeholder=""
                onChange={handleChange}
            />
            </div>

            <div>
                <label htmlFor="anonymous">Anonymous:</label>
                <input
                type="checkbox"
                id="anonymous"
                placeholder="Stay anonymous?"
                onChange={handleChange}
            />
            </div>

            <div>
                <label htmlFor="fundraiser">TeamRazr:</label>
                <input
                type="fundraiser"
                id="fundraiser"
                value= {credentials.project}
                placeholder="TeamRazr ID"
                onChange={handleChange}
            />
            </div>

            <button type="submit" onClick={handleSubmit}>
                Submit
            </button>
        </form>
    );
}

export default NewPledgeForm;