async function deleteFundraiser(fundraiserId) {
    const token = window.localStorage.getItem("token");
    const email = window.localStorage.getItem("email");
    const url = `${import.meta.env.VITE_API_URL}/fundraisers/${fundraiserId}`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify({
                "user_email": email
            })
        });

        if (!response.ok) {
            const responseData = await response.json().catch(() => null);
            throw new Error(responseData?.detail || 'Failed to delete fundraiser');
        }

        return true;
    } catch (error) {
        console.error('Delete error details:', {
            message: error.message,
            token: token ? 'Token exists' : 'No token'
        });
        throw error;
    }
}


export default deleteFundraiser;