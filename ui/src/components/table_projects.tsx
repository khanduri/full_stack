import React, { useState } from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import "./table.css";

interface ProjectTableProps {
  projects: any[];
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleprojectsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProjectsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredprojects = projects.filter(
    (project) =>
      (project.department &&
        project.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (project.name &&
        project.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (project.status &&
        project.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const currentprojects = filteredprojects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  return (
    <div className="container mx-auto mt-10">
      <div className="">
        <select
          value={projectsPerPage}
          onChange={handleprojectsPerPageChange}
          className="rounded p-2"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <input
          type="text"
          placeholder="Search by Name, Department, Status"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded w-1/3 m-2 p-2 "
        />
      </div>
      <table className="min-w-full border-collapse border border-gray-200 font-neutra">
        <thead>
          <tr className="bg-blue uppercase">
            <th className="border border-gray-200 p-4">Name</th>
            <th className="border border-gray-200 p-4">Department</th>
            <th className="border border-gray-200 p-4">Status</th>
            <th className="border border-gray-200 p-4">Start Date</th>
            <th className="border border-gray-200 p-4">End Date</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {currentprojects.length > 0 ? (
            currentprojects.map((project, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-200 p-4">{project.name}</td>
                <td className="border border-gray-200 p-4">
                  {project.department}
                </td>
                <td className="border border-gray-200 p-4">
                  <span
                    className={`${getStatusClass(
                      project.status
                    )} text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="border border-gray-200 p-4">
                  {project.start_date}
                </td>
                <td className="border border-gray-200 p-4">
                  {project.end_date}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No projects found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          total={filteredprojects.length}
          pageSize={projectsPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

const getStatusClass = (status: string) => {
  if (status === "On Hold") {
    return "bg-red-100 text-red-800 ";
  } else if (status === "In Progress") {
    return "bg-indigo-100 text-indigo-800 ";
  } else if (status === "Completed") {
    return "bg-green-100 text-green-800 ";
  } else if (status === "Not Started") {
    return "bg-primary-100 text-primary-800 ";
  }
};

export default ProjectTable;
