async function postFundraiser(title, description, goal, image, owner_username) {
    const url = `${import.meta.env.VITE_API_URL}/fundraisers`;
    const token = window.localStorage.getItem("token");

    // Convert goal to number if it's a string
    const numericGoal = Number(goal);

    // Ensure image URL is valid
    const imageUrl = image.startsWith('http') ? image : `https://${image}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify({
                title: title,
                description: description,
                goal: numericGoal,
                image: imageUrl,
                is_open: true,
                owner: window.localStorage.getItem("user_id"),
                creator_name: owner_username
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            console.error("Fundraiser creation error:", data);
            const errorMessage = data.image ? data.image[0] : 'Error trying to post fundraiser';
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error("Post fundraiser error:", error);
        throw error;
    }
}

export default postFundraiser;