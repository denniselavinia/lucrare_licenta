import { useState, useRef } from "react";
import { FaRobot } from "react-icons/fa";
import { IoExtensionPuzzleSharp } from "react-icons/io5";
import { useFetchPuzzlesQuery } from "../redux/features/puzzles/puzzlesAPI";
import ollama from "ollama/browser";



function AISearch() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const responseRef = useRef(null);

    const { data: puzzles = []} = useFetchPuzzlesQuery();
    const systemPrompt = `
You are an assistant for a puzzle store. Here are the available puzzles:
${puzzles.map(p => `Title: ${p.title}, Description: ${p.description}, Number of pieces: ${p.noPieces}, Image category: ${p.categoryImage}, 
    Manufacturer/Brand: ${p.categoryManufacturer}, Price: ${p.price}`).join('\n')}
List ONLY the titles of the most relevant puzzles, separated by new lines. If none match, say "Nu s-au gasit puzzle-uri după caracteristicile cerute.
Also, if the query is not related to puzzles, respond with "Întrebarea nu este legată de puzzle-uri.
If the user asks for a specific puzzle, provide the title of that puzzle.
If the user ask for puzzles in general, find the right answer from the internet. Try to respond quicky, with lower waiting time."
`;

    const messages = [
        {
            role: "system",
            content: systemPrompt
        }
    ]

    const handleSearch = async () => {
        setResult("");
        setLoading(true);
        
        try {
            const response = await ollama.chat({
                model: "llama3",
                messages: [...messages,
                {
                    role: "user",
                    content: query
                }],
                stream: true,
            });
    
            for await (const part of response) {
                setLoading(false);
                // console.log("Bot response: ", part.message.content);
                setResult((prev) => prev + part.message.content);
            }
        } catch (error) {
            if (error.name === "AbortError") {
                // eslint-disable-next-line no-console
                console.log("ChatBot request was aborted.");
            }
        } finally {
            
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 px-12 py-8 flex flex-col-reverse items-end">
            {open && (
                <div
                    className="mt-2 bg-white border rounded-xl shadow-2xl p-4 flex flex-col"
                    style={{
                        width: "min(95vw, 380px)",
                        maxWidth: "98vw",
                        height: "min(80vh, 520px)",
                        maxHeight: "90vh",
                    }}
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-orange-700 flex items-center gap-2">
                            <IoExtensionPuzzleSharp className="size-7" style={{ color: "orange", transform: "rotate(30deg)" }}/> AI Puzzle Chat
                        </span>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                        Întreabă AI-ul despre modelele de puzzle din aplicație.
                    </div>
                    <div
                        ref={responseRef}
                        className="border rounded bg-gray-50 p-2 mb-2 overflow-y-auto text-sm flex-1"
                        style={{ minHeight: "100px", maxHeight: "40vh" }}
                    >
                        {loading && <span className="text-blue-400">AI scrie...</span>}
                        {result}
                    </div>
                    <textarea
                        className="border px-2 py-1 rounded w-full mb-2 resize-none h-16 overflow-y-auto"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Scrie întrebarea ta pentru AI..."
                        onKeyDown={e => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSearch();
                            }
                        }}
                        disabled={loading}
                        style={{ maxHeight: "80px" }}
                    />
                    <button
                        className="w-full px-4 py-2 bg-orange-600 text-white rounded font-semibold"
                        onClick={handleSearch}
                        disabled={loading || !query.trim()}
                    >
                        Întreabă
                    </button>
                </div>
            )}
            <button
                className="bg-orange-600 text-white rounded-full p-4 shadow-lg hover:bg-orange-700 transition flex items-center justify-center"
                onClick={() => setOpen(o => !o)}
                aria-label="Deschide chat AI"
            >
                <FaRobot size={28} />
            </button>
        </div>
    );
}

export default AISearch;