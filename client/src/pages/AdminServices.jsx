import React, { useEffect, useState } from "react";
import "../CSS/AdminServices.css";

export const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    service: "",
    description: "",
    price: "",
    provider: "",
  });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    const res = await fetch("http://localhost:3000/api/admin/services", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setServices(data.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    service: form.service,
    description: form.description,
    price: form.price,
    provider: form.provider,
  };

  const url = editId
    ? `http://localhost:3000/api/admin/services/${editId}`
    : "http://localhost:3000/api/admin/services";

  const method = editId ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    setForm({
      service: "",
      description: "",
      price: "",
      provider: "",
    });
    setEditId(null);
    fetchServices();
  }
};


 const handleEdit = (service) => {
  setEditId(service._id);
  setForm({
    service: service.service,
    description: service.description,
    price: service.price,
    provider: service.provider,
  });
};


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    await fetch(`http://localhost:3000/api/admin/services/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setServices((prev) => prev.filter((s) => s._id !== id));
  };

  return (
    <div className="admin-services">
      <h1>Admin Services</h1>

      {/* ADD / EDIT FORM */}
      <form className="service-form" onSubmit={handleSubmit}>
        <input name="service" placeholder="Service Name" value={form.service} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="price" placeholder="Price Range" value={form.price} onChange={handleChange} required />
        <input name="provider" placeholder="Provider" value={form.provider} onChange={handleChange} required />
        <button type="submit">{editId ? "Update Service" : "Add Service"}</button>
      </form>

      {/* TABLE */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Description</th>
            <th>Price</th>
            <th>Provider</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s._id}>
              <td>{s.service}</td>
              <td>{s.description}</td>
              <td>{s.price}</td>
              <td>{s.provider}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(s)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminServices;
