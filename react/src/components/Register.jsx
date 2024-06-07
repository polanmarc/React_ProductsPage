import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Button from "./Button";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  
    if (!formData.name.trim()) {
      errors.name = "First Name is required";
    }
  
    if (!formData.surname.trim()) {
      errors.surname = "Last Name is required";
    }
  
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.toLowerCase())) {
      errors.email = "Invalid email format";
    }
  
    if (!formData.password) {
      errors.password = "Password is required";
    }
  
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
  
    if (!formData.agreeTerms) {
      errors.agreeTerms = "You must accept Terms and Conditions";
    }
  
    setFormErrors(errors);
    return errors;
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
  
    formData.email = formData.email.toLowerCase();
  
    try {
      const response = await fetch("http://0.0.0.0:8081/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        if (data.password) {
          alert(data.password);
        } else if (data.register) {
          alert(data.register);
        } else {
          throw new Error("Registration failed");
        }
        return;
      }
  
      navigate("/login");
    } catch (error) {
      alert("Failed to register user: " + error);
    }
  };  

  return (
    <div id="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {formErrors.name && (
            <p className="error">{formErrors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
          />
          {formErrors.surname && (
            <p className="error">{formErrors.surname}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && (
            <p className="error">{formErrors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {formErrors.password && (
            <p className="error">{formErrors.password}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {formErrors.confirmPassword && (
            <p className="error">{formErrors.confirmPassword}</p>
          )}
        </div>
        <div id="containerAgreeTerms">
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
          />
          <label htmlFor="agreeTerms">I agree to the Terms & Conditions</label>
          {formErrors.agreeTerms && (
            <p className="error" style={{ paddingTop: "15px" }}>{formErrors.agreeTerms}</p>
          )}
        </div>
        <div>
          <Button texto="Register"/>
        </div>
        <div className="align">
            <p>Already a member?</p>
            <NavLink className="enlace" to="/login">Sign in</NavLink>
        </div>
      </form>
    </div>
  );
}

export default Register;
