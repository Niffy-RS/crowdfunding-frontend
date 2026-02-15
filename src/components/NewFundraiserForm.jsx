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
            postFundraiser(
                credentials.title,
                credentials.description,
                credentials.goal,
                credentials.image,
            ).then((response) => {
                const userId = auth.user_id || window.localStorage.getItem("user_id");
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
                    />
                </div>

                <div className="form-section">
                    <label className="form-label" htmlFor="description">Operational Brief (Description):</label>
                    <input
                        className="form-input"
                        id="description"
                        placeholder="PROVIDE OBJECTIVE DATA ONLY..."
                        onChange={handleChange}
                    ></input>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-section">
                        <label className="form-label" htmlFor="goal">Resource Target ($):</label>
                        <input
                            className="form-input"
                            type="goal"
                            id="goal"
                            placeholder="0.00"
                            onChange={handleChange}
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
                        />
                    </div>
                </div>

                <div>
                    <label className="form-label" htmlFor="acknowledgement">
                        I acknowledge that this drive serves the collective interest of the corporation.
                    </label>
                </div>

                <button className="corporate-btn" type="submit">
                    COMMENCE INITIALISATION
                </button>
            </form>

            <div className="terminal-subtext">
                TMRZR_INTERNAL_DOC_REF: {Math.floor(Math.random() * 999)}-ALPHA
            </div>
        </div>
    );
}

export default NewFundraiserForm;