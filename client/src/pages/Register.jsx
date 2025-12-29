import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "../CSS/Register.css";
import registerImg from "../assets/react.svg"; // add your illustration here
import { useAuth } from "../../store/auth.jsx"
import { toast } from "react-toastify";

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const {storetokenInLS} = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res_data = await response.json();
      console.log('registration response data', res_data);
      if (response.ok) {
        storetokenInLS(res_data.token);
        toast.success("Registration successful!");
        setFormData({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/login");
      }else{
        toast.error(res_data.extraDetails || res_data.message || "Registration failed!");
      }
      
    } catch (error) {
      console.log('register error', error);
    }
    
  };

  return (
    <div className="register-page">
      {/* Left Section */}
      <div className="register-left">
        <img src={registerImg} alt="Register Illustration" />
      </div>

      {/* Right Section */}
      <div className="register-right">
        <h2>Registration Form</h2>

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone</label>
          <input
            type="number"
            name="phone"
            placeholder="Enter phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Register Now</button>
        </form>
      </div>
    </div>
  );
};
