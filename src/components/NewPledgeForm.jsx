import { useState, useEffect } from "react"; // Added useEffect
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import postPledge from "../api/post-pledge";
import "./Forms.css";

function NewPledgeForm(props) {
    const navigate = useNavigate();
    const { fundraiserId } = props;
    const { auth } = useAuth();
    const [credentials, setCredentials] = useState({
        amount: "",
        comment: "",
        anonymous: false,
        fundraiserId: fundraiserId
    });
    // Redirect if not logged in
    useEffect(() => {
        if (!auth.token && !window.localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [auth, navigate]);

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
                credentials.fundraiserId
            ).then(() => {
                const userId = auth?.user_id || window.localStorage.getItem("user_id");
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

            <form>
                <div className="form-section">
                    <label className="form-label" htmlFor="amount">Relinquishment Amount ($):</label>
                    <input
                        className="form-input"
                        type="number"
                        id="amount"
                        placeholder="0.00"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-section">
                    <label className="form-label" htmlFor="comment">HR Approved Sentiment (Comment):</label>
                    <input
                        className="form-input"
                        id="comment"
                        placeholder="PROVIDE OBJECTIVE DATA ONLY"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-section">
                    <input
                        type="checkbox"
                        id="anonymous"
                        onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="anonymous">
                        Mask Identity (Anonymous)
                    </label>
                </div>

                <div className="form-section">
                    <label className="form-label" htmlFor="fundraiser">Designated Asset ID:</label>
                    <input
                        className="form-input"
                        type="fundraiser"
                        id="fundraiser"
                        value={credentials.fundraiserId}
                        onChange={handleChange}
                    />
                </div>

                <button className="corporate-btn" type="submit" onClick={handleSubmit}>
                    CONFIRM TRANSFER
                </button>
            </form>
        </div>
    );
}

export default NewPledgeForm;