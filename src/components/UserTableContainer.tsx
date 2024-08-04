import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "./UserTable";
import EditUserModal from "./EditUserModal";

const UserTableContainer = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/users")
      .then((response) => {
        setUsers(response.data); // Set the users state with the fetched data
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedUser({ name: "", email: "", password: "" });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleUserUpdate = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.email === updatedUser.email ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  const handleUserAdd = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <>
      <h1>User Management</h1>
      <button onClick={handleAddClick} className="add-user-button">
        Add User
      </button>
      <UserTable users={users} onEditClick={handleEditClick} />
      {isModalOpen && (
        <EditUserModal
          user={selectedUser}
          onClose={handleModalClose}
          onUserUpdate={handleUserUpdate}
          onUserAdd={handleUserAdd}
        />
      )}
    </>
  );
};

export default UserTableContainer;
