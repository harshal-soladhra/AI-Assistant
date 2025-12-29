import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "../CSS/Register.css";
import registerImg from "../assets/react.svg"; // add your illustration here
import { useAuth } from "../../store/auth.jsx"

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

const navigate = useNavigate();
const {storetokenInLS} = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(`http://localhost:3000/api/auth/login`, {
        method:"POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if(response.ok){
        const res_data = await response.json();
        console.log('registration response data', res_data);

        storetokenInLS(res_data.token);
        alert("Login successful!");
        setFormData({
          email: "",
          password: "",
        });
        navigate("/");
      }
      else{
        alert("Login failed! Please check your credentials.");
      }
      

    } catch (error) {
      console.log('login error', error);
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
        <h2>Login Form</h2>

        <form onSubmit={handleSubmit}>

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
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

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
