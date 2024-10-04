import React, { createContext, useState, ReactNode } from "react";
import axios from "axios";

interface DataContextProps {
  data: any[];
  loading: boolean;
  pageSize: number;
  setPageSize: (size: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  fetchData: (endpoint: string) => void;
}

export const DataContext = createContext<DataContextProps | undefined>(
  undefined
);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async (endpoint: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${endpoint}?limit=${pageSize}&skip=${(currentPage - 1) * pageSize}`
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        pageSize,
        setPageSize,
        currentPage,
        setCurrentPage,
        searchTerm,
        setSearchTerm,
        fetchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
