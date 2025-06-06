import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPagesToShow = 10;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2)); 
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      const adjustedStartPage = Math.max(1, endPage - maxPagesToShow + 1);
      if (adjustedStartPage !== startPage) {
        startPage = adjustedStartPage; 
      }
    }
  

    
    if (startPage > 1) {
      pageNumbers.push(
        <li key={1} onClick={() => onPageChange(1)}>
          1
        </li>
      );
      if (startPage > 2) {
        pageNumbers.push(<li key="start-ellipsis">...</li>);
      }
    }

    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={currentPage === i ? 'active' : ''}
          onClick={() => onPageChange(i)}
        >
          {i}
        </li>
      );
    }

    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<li key="end-ellipsis">...</li>);
      }
      pageNumbers.push(
        <li key={totalPages} onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <ul>
        <li
          onClick={() => onPageChange(currentPage - 1)}
          className={currentPage === 1 ? 'disabled' : ''}
        >
          Previous
        </li>
        {renderPageNumbers()}
        <li
          onClick={() => onPageChange(currentPage + 1)}
          className={currentPage === totalPages ? 'disabled' : ''}
        >
          Next
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
