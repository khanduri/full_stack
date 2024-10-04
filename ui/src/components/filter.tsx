import React, { useContext } from "react";
import { DataContext } from "../context/data_context";

const Filter: React.FC = () => {
  const { searchTerm, setSearchTerm } = useContext(DataContext)!;

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
};

export default Filter;
