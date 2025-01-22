import React from 'react';

const Pagination = ({ page, setPage, paginationData }) => {
  if (!paginationData) return null;

  const maxVisible = 3;
  const totalPages = paginationData.last_visible_page;
  
  const generatePaginationNumbers = () => {
    let numbers = [];
    const leftOffset = Math.floor(maxVisible / 2);
    let start = Math.max(page - leftOffset, 1);
    let end = Math.min(start + maxVisible - 1, totalPages);

    // Adjust start if we're near the end
    if (end - start + 1 < maxVisible) {
      start = Math.max(end - maxVisible + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const paginationNumbers = generatePaginationNumbers();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 px-2 py-4 sm:gap-4">
      {/* Info Section */}
      <div className="w-full mb-2 text-sm text-center text-palette-secondary/80">
        Showing {paginationData.items.count} of {paginationData.items.total} items
      </div>
      
      {/* Navigation Section */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md transition-colors ${
            page === 1
              ? 'bg-palette-accent/20 text-palette-secondary/20 cursor-not-allowed'
              : 'bg-palette-accent text-palette-secondary hover:bg-palette-accent/80'
          }`}
        >
          Prev
        </button>

        {/* First Page */}
        {paginationNumbers[0] > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md transition-colors ${
                page === 1 ? 'border-y-palette-accent border-y-2 text-palette-secondary' : 'bg-transparent opacity-100 hover:opacity-80'
              }`}
            >
              1
            </button>
            {paginationNumbers[0] > 2 && (
              <span className="px-1 sm:px-2">...</span>
            )}
          </>
        )}

        {/* Pagination Numbers */}
        {paginationNumbers.map((num) => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md transition-colors ${
              page === num
                ? 'border-y-palette-accent border-y-2 text-palette-secondary'
                : 'bg-transparent opacity-100 hover:opacity-80'
            }`}
          >
            {num}
          </button>
        ))}

        {/* Last Page */}
        {paginationNumbers[paginationNumbers.length - 1] < totalPages && (
          <>
            {paginationNumbers[paginationNumbers.length - 1] < totalPages - 1 && (
              <span className="px-1 sm:px-2">...</span>
            )}
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md transition-colors ${
                page === totalPages ? 'border-y-palette-accent border-y-2 text-palette-secondary' : 'bg-transparent opacity-100 hover:opacity-80'
              }`}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!paginationData.has_next_page}
          className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md transition-colors ${
            !paginationData.has_next_page
              ? 'bg-palette-accent/20 text-palette-secondary/20 cursor-not-allowed'
              : 'bg-palette-accent text-palette-secondary hover:bg-palette-accent/80'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;