import React, { useContext } from "react";
import { DataContext } from "../context/data_context";

const Pagination: React.FC = () => {
  const { currentPage, setCurrentPage, pageSize, setPageSize } =
    useContext(DataContext)!;

  return (
    <div>
      <select
        onChange={(e) => setPageSize(Number(e.target.value))}
        value={pageSize}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span>{currentPage}</span>
      <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
    </div>
  );
};

export default Pagination;
