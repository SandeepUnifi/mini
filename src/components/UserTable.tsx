import React from "react";
import "./UserTable.css"; // Import the CSS file for table styling

const UserTable = ({ users, onEditClick }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.email}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td>
              <button onClick={() => onEditClick(user)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
