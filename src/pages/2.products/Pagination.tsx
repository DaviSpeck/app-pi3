import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <nav className="flex justify-center space-x-2" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 ? 'hidden' : 'block'}`}
      >
        &lt;
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`px-3 py-1 text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700 ${pageNumber === currentPage ? "text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100" : ""}`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700 ${currentPage === totalPages ? 'hidden' : 'block'}`}
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;
