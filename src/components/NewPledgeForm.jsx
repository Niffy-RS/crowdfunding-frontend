import { useState, useEffect } from "react"; // Added useEffect
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import postPledge from "../api/post-pledge";
import "./Forms.css";

function NewPledgeForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { auth } = useAuth();

    // 1. COMPLIANCE CHECK: Redirect if not logged in
    useEffect(() => {
        if (!auth.token && !window.localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [auth, navigate]);

    const [credentials, setCredentials] = useState({
        amount: "",
        comment: "",
        anonymous: false,
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

        // Ensure amount is handled as a number for the backend
        if (credentials.amount && credentials.fundraiser) {
            postPledge(
                credentials.amount,
                credentials.comment,
                credentials.anonymous,
                credentials.fundraiser
            ).then(() => {
                const userId = auth?.user_id || window.localStorage.getItem("user_id");
                // Successful redirection to Personal Dashboard
                navigate(`/users/${userId}`);
            }).catch((err) => {
                console.error("ALLOCATION_FAILURE:", err);
                alert("Transfer failed. Please ensure all data points are objective.");
            });
        }
    };

    return (
        <div className="document-container page-fade-in">
            <h2 className="form-title">Asset Allocation Agreement</h2>

            <form onSubmit={handleSubmit}>
                {/* 2. THE MISSING INPUTS: Ensure these are visible */}
                <div className="form-section">
                    <label className="form-label" htmlFor="amount">Relinquishment Amount ($):</label>
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
                    <textarea
                        className="form-input"
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
                    <label className="form-label" htmlFor="anonymous" style={{ marginLeft: "10px" }}>
                        Mask Identity (Anonymous)
                    </label>
                </div>

                <div className="form-section">
                    <label className="form-label" htmlFor="fundraiser">Designated Asset ID:</label>
                    <input
                        className="form-input"
                        type="text"
                        id="fundraiser"
                        value={credentials.fundraiser}
                        readOnly
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