async function postUser(username, password, first_name, last_name, email) {
    const url = `${import.meta.env.VITE_API_URL}/users/`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username": username,
            "email": email,
            "password": password,
            "first_name": first_Name, // Mapping your React variable to the backend key
            "last_name": last_Name
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to signup`;

        const data = await response.json().catch(() => {
        throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
    }

    export default postUser;