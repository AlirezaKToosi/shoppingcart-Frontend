// 1. Node modules
import React, { useState } from "react";

// 2. Project file
import Login from "./components/Login";
import TodoList from "./components/TodoList";
import "./style/components/App.css";

// Functionl Component (FC) with 1 line export shorcut
export default function App() {
  // 3. Global state
  // Not used in this file

  // 4. Local state
  const [user, setUser] = useState("");

  // 6. Methods
  function handleLogin(email) {
    setUser(email);
  }
  function handleSignout() {
    setUser("");
  }

  // 8. Render
  return (
    <div className="App">
      {user ? (
        <TodoList user={user} onSignout={handleSignout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}
