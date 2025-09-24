import React from "react";
export default function UserList({ users, onEdit, onDelete }) {
  return (
    <div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Edit</th>
            <th className="border p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.id}</td>
              <td className="border p-2">
                {u.firstName} {u.lastName}
              </td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.department}</td>
              <td className="border p-2">
                <button onClick={() => onEdit(u)}>Edit</button>
              </td>
              <td className="border p-2">
                <button onClick={() => onDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
