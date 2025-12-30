import React, { useEffect, useState } from "react";
import "../CSS/AdminDashboard.css";

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("token");

  const fetchDashboardData = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Dashboard fetch failed", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (!stats) {
    return <p className="admin-loading">Loading dashboard...</p>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* STAT CARDS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h2>{stats.counts.users}</h2>
          <p>Total Users</p>
        </div>

        <div className="stat-card">
          <h2>{stats.counts.contacts}</h2>
          <p>Total Contacts</p>
        </div>

        <div className="stat-card">
          <h2>{stats.counts.services}</h2>
          <p>Total Services</p>
        </div>
      </div>

      {/* RECENT USERS */}
      <div className="dashboard-section">
        <h3>Recent Users</h3>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RECENT CONTACTS */}
      <div className="dashboard-section">
        <h3>Recent Contacts</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentContacts.map((c) => (
              <tr key={c._id}>
                <td>{c.username}</td>
                <td>{c.email}</td>
                <td className="truncate">{c.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
