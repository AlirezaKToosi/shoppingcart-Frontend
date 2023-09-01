import React, { useState } from "react";
import "../style/App.css";

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

  return (
    <div id="login">
      <h2>Login</h2>
      <input
        className="input-Email"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
};

export default Login;
