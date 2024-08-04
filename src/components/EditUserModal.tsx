import React, { useState } from "react";
import axios from "axios";
import "./EditUserModal.css"; // Import the CSS file for modal styling

const EditUserModal = ({ user, onClose, onUserUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8085/users/${user.email}`, formData)
      .then((response) => {
        onUserUpdate(response.data);
        onClose();
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Details</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
