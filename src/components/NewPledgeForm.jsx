import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// 1. ADD: Import your auth hook
import useAuth from "../hooks/use-auth";
import postPledge from "../api/post-pledge";
import "./Forms.css";

function NewPledgeForm() {
    const navigate = useNavigate();
    // 2. ADD: Use useParams to grab the ID from the URL (e.g., /pledge/5)
    const { id } = useParams();
    // 3. ADD: Initialize auth context
    const { auth } = useAuth();

    const [credentials, setCredentials] = useState({
        amount: "",
        comment: "",
        anonymous: false,
        // 4. SYNC: Map the URL 'id' to the fundraiser field
        fundraiser: id || ""
    });

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (credentials.amount && credentials.fundraiser) {
            postPledge(
                credentials.amount,
                credentials.comment,
                credentials.anonymous,
                credentials.fundraiser
            ).then((response) => {
                // 5. REDIRECT: Use the ID from auth or fallback to localStorage
                const userId = auth?.user_id || window.localStorage.getItem("user_id");
                navigate(`/users/${userId}`);
            }).catch((err) => {
                console.error("ALLOCATION_FAILURE: Connection severed.", err);
                alert("Transfer failed. Ensure your session is still active.");
            });
        }
    };

    return (
        <div className="document-container page-fade-in">
            <h2 className="form-title">Asset Allocation Agreement</h2>

            <form onSubmit={handleSubmit}>
                {/* ... Amount and Comment fields remain the same ... */}

                <div className="form-section">
                    <label className="form-label" htmlFor="fundraiser">Designated Asset ID:</label>
                    <input
                        className="form-input"
                        type="text"
                        id="fundraiser"
                        value={credentials.fundraiser}
                        placeholder="RETRIEVING_ID..."
                        readOnly // Protocol requirement: don't let users edit the key manually
                        style={{ backgroundColor: '#f0f0f0', opacity: 0.7 }}
                    />
                </div>

                <button className="corporate-btn" type="submit">
                    CONFIRM TRANSFER
                </button>
            </form>
        </div>
    );
}

export default NewPledgeForm;