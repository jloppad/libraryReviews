import React from "react";

const Search = ({ searchQuery, handleSearchChange }) => {
    return (
        <div className="search-container">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search books by title..."
            />
        </div>
    );
};

export default Search;
