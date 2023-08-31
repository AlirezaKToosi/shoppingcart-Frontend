import React, { useState } from "react";
import "../style/components/App.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // 5. Properties
  const endpoint = "http://localhost:8080/auth/login";
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

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        onLogin(email);
      } else {
        setErrorMessage("Incorrect email or password");
      }
    } catch (error) {
      alert("Sorry we could not load the data");
      console.error(error); // Handle error
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
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
