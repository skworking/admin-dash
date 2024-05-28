export const fetchData = async (url, token) => {
    try {
        const result = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, // Replace token with your actual JWT token
                "Content-Type": "application/json",
            },
        });
        const data = await result.json();

        if (data.success) {
            return { data: data.result, totalPages: data.totalPages };
        } else {
            console.error("Error fetching data:", data.error);
            return { data: [], totalPages: 0 };
        }
    } catch (err) {
        console.error("Error fetching data:", error);
        return { data: [], totalPages: 0 };
    }
}