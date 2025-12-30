import React, { useEffect, useState } from "react";
import "../CSS/AdminUsers.css";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setUsers(data.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔴 DELETE USER
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    const res = await fetch(
      `http://localhost:3000/api/admin/users/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      setUsers(users.filter((user) => user._id !== id));
    }
  };

  // ✏️ UPDATE USER
  const handleUpdate = async () => {
    const res = await fetch(
      `http://localhost:3000/api/admin/users/${editUser._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editUser),
      }
    );

    const data = await res.json();

    if (res.ok) {
      setUsers(
        users.map((u) => (u._id === editUser._id ? data.data : u))
      );
      setEditUser(null);
    }
  };

  return (
    <div className="admin-users-page">
      <h1 className="admin-title">Admin Users Data</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => setEditUser(user)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✏️ EDIT MODAL */}
      {editUser && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit User</h3>

            <input
              value={editUser.username}
              onChange={(e) =>
                setEditUser({ ...editUser, username: e.target.value })
              }
            />

            <input
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />

            <input
              value={editUser.phone}
              onChange={(e) =>
                setEditUser({ ...editUser, phone: e.target.value })
              }
            />

            <div className="modal-actions">
              <button onClick={handleUpdate} className="btn-edit">
                Save
              </button>
              <button
                onClick={() => setEditUser(null)}
                className="btn-delete"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminUsers;