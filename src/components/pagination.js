import React from "react";

const Pagination = ({ page, totalBooks, limit, handlePageChange }) => {
    const totalPages = Math.ceil(totalBooks / limit);

    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (page <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (page >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="pagination">
            <button 
                onClick={() => handlePageChange(page - 1)} 
                disabled={page === 1}
                className="page-button"
            >
                {"<"}
            </button>
            {getPageNumbers().map((pageNumber, index) => (
                <button
                    key={index}
                    onClick={() => typeof pageNumber === "number" && handlePageChange(pageNumber)}
                    disabled={pageNumber === "..." }
                    className={`page-button ${pageNumber === page ? "active" : ""}`}
                >
                    {pageNumber}
                </button>
            ))}
            <button 
                onClick={() => handlePageChange(page + 1)} 
                disabled={page === totalPages}
                className="page-button"
            >
                {">"}
            </button>
        </div>
    );
};

export default Pagination;
