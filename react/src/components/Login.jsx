import React, { useState, useContext } from "react";
import AuthContext from "./AuthContext";
import { Navigate, NavLink } from "react-router-dom";
import Button from "./Button";

function Login() {
  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: ""
  });
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataLogin((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!formDataLogin.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formDataLogin.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formDataLogin.password.trim()) {
      errors.password = 'Password is required';
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

    try {
      const response = await fetch("http://0.0.0.0:8081/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataLogin),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setIsLoggedIn(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      alert("No se ha logeado el usuario: " + error);
    }
  };

  return (
    <div id="login">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="emailLogin"
            name="email"
            value={formDataLogin.email}
            onChange={handleChange}
          />
          {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="passwordLogin"
            name="password"
            value={formDataLogin.password}
            onChange={handleChange}
          />
          {formErrors.password && <p style={{ color: "red" }}>{formErrors.password}</p>}
        </div>
        {isLoggedIn !== null && <Navigate to="/profile" replace={true} />}
        <div className="align">
          <Button texto="Login" />
          <NavLink className="enlace" to="/">Need Help?</NavLink>
        </div>
        <div className="align">
          <p>Don't have an account?</p>
          <NavLink className="enlace" to="/register">Register now</NavLink>
        </div>
      </form>
    </div>
  );
}

export default Login;
