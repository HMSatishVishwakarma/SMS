import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

interface MyPaginationProps {
  totalRecords: number; // Explicitly define totalRecords as a number
  currentPage: number;
  onPageChange: (page: number) => void;
  recordsPerPage?: number;
}

const PaginationComponent: React.FC<MyPaginationProps> = ({
  totalRecords,
  currentPage,
  onPageChange,
  recordsPerPage = 10,
}) => {
  const [activePage, setActivePage] = useState(currentPage);
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setActivePage(page);
    onPageChange(page);
  };

  const renderPaginationItems = () => {
    const items = [];
    const startPage = Math.max(1, activePage - 2);
    const endPage = Math.min(totalPages, activePage + 2);

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === activePage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>,
      );
    }

    return items;
  };

  return (
    <Pagination className="justify-content-end">
      <Pagination.First
        onClick={() => handlePageChange(1)}
        disabled={activePage === 1}
      />
      <Pagination.Prev
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1}
      />
      {renderPaginationItems()}
      <Pagination.Next
        onClick={() => handlePageChange(activePage + 1)}
        disabled={activePage === totalPages}
      />
      <Pagination.Last
        onClick={() => handlePageChange(totalPages)}
        disabled={activePage === totalPages}
      />
    </Pagination>
  );
};

export default PaginationComponent;
