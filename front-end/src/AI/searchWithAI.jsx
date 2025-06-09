import { useState } from "react"
import axios from "axios";

function AISearch() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState("");

    const handleSearch = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/ai/search", { query });
            setResult(res.data.result);
        } catch (err) {
            setResult("Eroare la căutarea AI: " + (err.response?.data?.error || err.message));
        }
    };

    return (
        <div className="my-4">
            <input
                className="border px-2 py-1 rounded"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Caută un puzzle cu AI..."
            />
            <button className="ml-2 px-4 py-1 bg-blue-600 text-white rounded" onClick={handleSearch}>
                Caută
            </button>
            <div className="mt-4 whitespace-pre-line">{result}</div>
        </div>
    );
}
export default AISearch;