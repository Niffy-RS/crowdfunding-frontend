async function putFundraiser(title, description, goal, image, fundraiserId) {
    const token = window.localStorage.getItem("token");
    const email = window.localStorage.getItem("email");
    const url = `${import.meta.env.VITE_API_URL}/fundraisers/${fundraiserId}`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
            "title": title,
            "description": description,
            "goal": goal,
            "image": image,
            "fundraiserId": fundraiserId
            }),
    });

    if (!response.ok) {
        const data = await response.json().catch(() => ({
            detail: 'Failed to update fundraiser'
        }));
        throw new Error(data.detail);
    }

    return await response.json();
}

export default putFundraiser;