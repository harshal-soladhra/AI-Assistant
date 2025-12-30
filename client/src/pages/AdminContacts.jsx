import React, { useEffect, useState } from "react";
import "../CSS/AdminContacts.css";

export const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/contacts",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setContacts(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch contacts", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE CONTACT
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/contacts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        // remove contact from UI
        setContacts((prev) => prev.filter((c) => c._id !== id));
        alert(data.message || "Contact deleted");
      } else {
        alert(data.message || "Failed to delete contact");
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return <p className="admin-loading">Loading contacts...</p>;
  }

  return (
    <div className="admin-contacts-page">
      <h1 className="admin-title">Admin Contacts</h1>

      <div className="admin-table-wrapper">
        <table className="admin-table-messages">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th> {/* ✅ NEW */}
            </tr>
          </thead>

          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.username}</td>
                  <td>{contact.email}</td>
                  <td className="message-cell">{contact.message}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(contact._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No contacts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContacts;
