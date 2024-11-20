

import React from 'react';

const UserTable = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white ">
          <tr>
            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Role</th>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
          {users?.length > 0 ? (
            users.map((user, index) => (
              <tr key={index} className=" hover:bg-gray-300 dark:hover:bg-gray-700">
                <td className="text-left py-3 px-4">{user.name}</td>
                <td className="text-left py-3 px-4">{user.email}</td>
                <td className="text-left py-3 px-4">{user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
