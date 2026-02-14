import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postPledge from "../api/post-pledge"; // Ensure this import path is correct
import "./Forms.css";

function NewPledgeForm(props) {
    const navigate = useNavigate();
    const { fundraiserId } = props;
    
    const [credentials, setCredentials] = useState({
        amount: "",
        comment: "",
        anonymous: false,
        fundraiser: fundraiserId || ""
    });

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            // Using 'checked' for checkboxes is vital
            [id]: type === "checkbox" ? checked : value,
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Clinical validation check
        if (credentials.amount && credentials.comment) {
            postPledge(
                credentials.amount,
                credentials.comment,  
                credentials.anonymous,  
                credentials.fundraiser
            ).then((response) => {
                const userId = auth.user_id || window.localStorage.getItem("user_id");
                navigate(`/users/${userId}`);
            }).catch((err) => {
                console.error("ALLOCATION_FAILURE: Connection severed.");
            });
        }
    };

    return (
        <div className="document-container page-fade-in">
            <h2 className="form-title">Asset Allocation Agreement</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <label className="form-label" htmlFor="amount">Amount to Relinquish ($)</label>              
                    <input
                        className="form-input"
                        type="number"
                        id="amount"
                        placeholder="0.00"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-section">
                    <label className="form-label" htmlFor="comment">HR Approved Sentiment (Comment):</label>
                    <input
                        className="form-input"
                        type="text"
                        id="comment"
                        placeholder="PROVIDE OBJECTIVE DATA ONLY"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-section">
                    <input
                        type="checkbox"
                        id="anonymous"
                        onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="anonymous">
                        Mask Identity (Anonymous Contribution)
                    </label>
                </div>

                <div className="form-section">
                    <label className="form-label" htmlFor="fundraiser">Designated Asset ID:</label>
                    <input
                        className="form-input"
                        type="text"
                        id="fundraiser"
                        value={credentials.fundraiser}
                        placeholder="RETRIEVING_ID..."
                        onChange={handleChange}
                        readOnly={!!fundraiserId} // If passed via props, lock it
                        style={fundraiserId ? { backgroundColor: '#f0f0f0', opacity: 0.7 } : {}}
                    />
                </div>

                <button className="corporate-btn" type="submit">
                    CONFIRM TRANSFER
                </button>
            </form>

            <div className="terminal-subtext">
                Ref: Ledger_Entry_Seq_{Math.floor(Math.random() * 10000)}
            </div>
        </div>
    );
}

export default NewPledgeForm;