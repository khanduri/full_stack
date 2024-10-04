import React, { useState } from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import "./table.css";

interface UserProfile {
  address: string;
  birthdate: string;
  blood_group: string;
  company: string;
  current_location: string[];
  job: string;
  mail: string;
  name: string;
  residence: string;
  sex: string;
  ssn: string;
  username: string;
  website: string[];
}

interface UserTableProps {
  // users: UserProfile[]; // Correctly typed as UserProfile[]
  users: any[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUsersPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setUsersPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.profile.name &&
        user.profile.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.profile.mail &&
        user.profile.mail.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.profile.job &&
        user.profile.job.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.profile.address &&
        user.profile.address
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (user.profile.company &&
        user.profile.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="container mx-auto mt-10">
      <div className="">
        <select
          value={usersPerPage}
          onChange={handleUsersPerPageChange}
          className="rounded p-2"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <input
          type="text"
          placeholder="Search by Name, Email, Company, Job, Address"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded w-1/3 m-2 p-2 "
        />
      </div>
      <table className="min-w-full border-collapse border border-gray-200 font-neutra">
        <thead>
          <tr className="bg-blue uppercase">
            <th className="border border-gray-200 p-4">Name</th>
            <th className="border border-gray-200 p-4">Email</th>
            <th className="border border-gray-200 p-4">Job</th>
            <th className="border border-gray-200 p-4">Company</th>
            <th className="border border-gray-200 p-4">Address</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {currentUsers.length > 0 ? (
            currentUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-200 p-4">
                  {user.profile.name}
                </td>
                <td className="border border-gray-200 p-4">
                  {user.profile.mail}
                </td>
                <td className="border border-gray-200 p-4">
                  {user.profile.job}
                </td>
                <td className="border border-gray-200 p-4">
                  {user.profile.company}
                </td>
                <td className="border border-gray-200 p-4">
                  {user.profile.address}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          total={filteredUsers.length}
          pageSize={usersPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default UserTable;
