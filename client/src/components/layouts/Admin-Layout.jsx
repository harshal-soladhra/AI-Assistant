import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaRegListAlt,
  FaHome,
} from "react-icons/fa";
import "./AdminLayout.css";

export const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* LEFT SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <p>Admin Panel</p>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin/dashboard" className="admin-link">
            <FaUser />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/users" className="admin-link">
            <FaUser />
            <span>Users</span>
          </NavLink>

          <NavLink to="/admin/contacts" className="admin-link">
            <FaEnvelope />
            <span>Contacts</span>
          </NavLink>

          <NavLink to="/admin/services" className="admin-link">
            <FaRegListAlt />
            <span>Services</span>
          </NavLink>

          <NavLink to="/" className="admin-link">
            <FaHome />
            <span>Home</span>
          </NavLink>
        </nav>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
