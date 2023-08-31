import React, { useState, useEffect } from "react";
import "../style/components/App.css";
import Item from "./Item";

const TodoList = ({ user, onSignout }) => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    console.log(user);
    const fetchTodoItems = async () => {
      try {
        const response = await fetch(`http://localhost:8080/todo/${user}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTodos(data);
        } else {
          // Handle fetch error
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchTodoItems();
  }, [user]);
  const Items = todos.map((item) => <Item key={item.id} item={item} />);

  return (
    <div className="todo-list-container">
      <h2>Welcome, {user}!</h2>
      <button onClick={onSignout}>Sign Out</button>
      <h3>Your Todo List:</h3>
      <ul>{Items}</ul>
    </div>
  );
};

export default TodoList;
