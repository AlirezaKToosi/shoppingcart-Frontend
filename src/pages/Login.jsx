import React, { useState } from "react";
import "../style/style.css";
import logo from "../assets/logo.svg";
import shoppingImage from "../assets/shoppingimage.png";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // 5. Properties
  const endpoint = "http://localhost:8080/auth";
  // 6. Methods
  const handleLogin = async () => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        onLogin(email);
      } else {
        setErrorMessage("Incorrect email or password");
      }
    } catch (error) {
      alert("Sorry we could not load the data");
      console.error(error);
    }
  };

  // 8. Render
  return (
    <div className="login-area center">
      <div className="topLogo">
        <img src={logo} alt="logo" />
      </div>
      <img
        src={shoppingImage}
        style={{ height: "200px", width: "267px" }}
        alt="shopping"
      />
      <p className="title">{"EIKA's shopping list"}</p>

      <div className="login-container">
        <label className="login-title">Email</label>
        <input
          className="login-input"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="login-container">
        <label className="login-title">Password</label>
        <input
          className="login-input"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="buttonMain" onClick={handleLogin}>
        Login
      </button>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
};

export default Login;
