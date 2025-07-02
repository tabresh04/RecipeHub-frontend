function Search({ searchTerm, setSearchTerm }) {
    return (
        <div className="mt-4 z-10 relative">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search recipes..."
                className="px-4 py-2 rounded-full shadow-md outline-none cursor-pointer w-72"
            />
        </div>
    );
}

export default Search;
// https://recipehub-backend-t3eq.onrender.com
