import { useState } from "react";
import { useNavigate } from "react-router-dom";

// FIX: Previously the SearchBar was purely visual — input had no state,
// button had no handler. Clicking Search did nothing at all.
//
// Now: typing and pressing Enter or clicking Search navigates to
// /posts?search=<term>. PostsPage reads that param and filters results.
export default function SearchBar() {

    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        const trimmed = query.trim();
        if (!trimmed) return;
        navigate(`/posts?search=${encodeURIComponent(trimmed)}`);
        setQuery("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search blogs..."
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                className="search-btn"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
}
