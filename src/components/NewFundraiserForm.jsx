import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postFundraiser from "../api/post-fundraiser"; // Correct path check
import "./Forms.css"

function NewFundraiserForm() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        title: "",
        description: "",
        goal: "",
        image: "",
        acknowledgement: false,
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
        // Validate protocol requirements
        if (credentials.title && credentials.description && credentials.goal && credentials.image) {
            postFundraiser(
                credentials.title,
                credentials.description,
                credentials.goal,
                credentials.image,
                credentials.acknowledgement
            ).then((response) => {
                const userId = auth.user_id || window.localStorage.getItem("user_id");
                // Successful capture redirects to dashboard
                navigate(`/users/${userId}`);
            }).catch((err) => {
                console.error("DATA_ENTRY_FAILURE: Protocol not established.");
            });
        }
    };

    return (
        <div className="document-container page-fade-in">
            <h2 className="form-title">Initiate Resource Drive</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <label className="form-label" htmlFor="title">Project Designation (Title):</label>
                    <input
                        className="form-input"
                        type="text"
                        id="title"
                        placeholder="ENTER DESIGNATION..."
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-section">
                    <label className="form-label" htmlFor="description">Operational Brief (Description):</label>
                    <textarea
                        className="form-input"
                        id="description"
                        rows="4"
                        placeholder="PROVIDE OBJECTIVE DATA ONLY..."
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-section">
                        <label className="form-label" htmlFor="goal">Resource Target ($):</label>
                        <input
                            className="form-input"
                            type="number"
                            id="goal"
                            placeholder="0.00"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-section">
                        <label className="form-label" htmlFor="image">Asset URL (Image):</label>
                        <input
                            className="form-input"
                            type="text"
                            id="image"
                            placeholder="HTTPS://..."
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-section">
                    <input
                        type="checkbox"
                        id="acknowledgement"
                        required
                        onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="acknowledgement">
                        I acknowledge that this drive serves the collective interest of the corporation.
                    </label>
                </div>

                <button className="corporate-btn" type="submit">
                    COMMENCE INITIALISATION
                </button>
            </form>

            <div className="terminal-subtext" style={{ marginTop: '1rem', textAlign: 'center' }}>
                LMN_INTERNAL_DOC_REF: {Math.floor(Math.random() * 999)}-ALPHA
            </div>
        </div>
    );
}

export default NewFundraiserForm;