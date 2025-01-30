import axios from "axios";

const SEARCH_API = "http://localhost:4000/api/v1/auth/searchUser";

export async function fetchResults(searchQuery, token, setError, setResults, setLoadingSearch) {
    if (!searchQuery) return;
    if (searchQuery === "") return;

    setLoadingSearch(true);
    setError(null);

    try {
        const response = await axios({
            method: "get",
            url: SEARCH_API + `?q=${searchQuery}`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        setResults(response.data.data);
    } catch (err) {
        setError("Error While Searching...");
        console.log("search error", err);
    } finally {
        setLoadingSearch(false);
    }
}
