export default function SearchBar() {
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search blogs..."
                className="search-input"
            />

            <button className="search-btn">
                Search
            </button>
        </div>
    );
}