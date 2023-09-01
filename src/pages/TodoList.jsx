import React, { useState, useEffect } from "react";
import "../style/pages/todolist.css";
import Item from "../components/Item";

const TodoList = ({ user, onSignout }) => {
  const [todoItems, setTodoItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: "", price: "", image: "" });
  const [ItemImageUrl, setItemImageUrl] = useState([]);

  useEffect(() => {
    // Fetch todo items after user logs in
    const fetchTodoItems = async (user) => {
      try {
        const response = await fetch(`http://localhost:8080/todo/${user}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTodoItems(data);
          console.log(response);
        } else {
          console.log(response);
          alert("There is not any item belong to you");
        }
      } catch (error) {
        alert("Sorry we could not load the data");
        console.error(error);
      }
    };
    fetchTodoItems(user);
  }, [user]);

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/todo/deleteItem/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Remove the deleted item from the todoItems state
        setTodoItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
      } else {
        alert("Failed to delete item.");
      }
    } catch (error) {
      alert("An error occurred while deleting the item.");
      console.error(error);
    }
  };

  const handleAddItem = async (user) => {
    const formData = new FormData();
    formData.append("title", newItem.title);
    formData.append("price", newItem.price);
    formData.append("image", newItem.image);
    console.log(formData);
    try {
      const response = await fetch(
        `http://localhost:8080/todo/addItem/${user}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const newItemData = await response.json();
        setTodoItems((prevItems) => [...prevItems, newItemData]);
        setNewItem({ title: "", price: "", image: "" }); // Clear the input fields
      } else {
        alert("Failed to add item.");
      }
    } catch (error) {
      alert("An error occurred while adding the item.");
      console.error(error);
    }
  };
  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file
    if (selectedFile) {
      setNewItem({ ...newItem, image: selectedFile });
    }
  };

  const handleImageDownload = async (itemId) => {
    try {
      // Make a GET request to your server's /display endpoint with the item's ID
      const response = await fetch(
        `http://localhost:8080/todo/display?id=${itemId}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        // Convert the response data to a blob
        const imageBlob = await response.blob();

        // Create a data URL from the blob to display the image
        const imageUrl = URL.createObjectURL(imageBlob);

        // Set the image URL in your component state
        setItemImageUrl(imageUrl);
      } else {
        // Handle the case when the image retrieval fails
        console.error("Failed to download image");
      }
    } catch (error) {
      console.error("Error while downloading image:", error);
    }
  };

  const Items = todoItems.map((item) => <Item key={item.id} item={item} />);
  return (
    <div className="todo-list-container">
      <h3>Welcome, {user}!</h3>
      <button className="signout-button" onClick={onSignout}>
        Sign Out
      </button>
      <h3>Your Todo List:</h3>
      <ul>
        {todoItems.map((item) => (
          <li key={item.id} className="todo-item">
            <div>Title: {item.title}</div>
            <div>Price: {item.price}</div>
            <img
              src={`data:image/jpeg;base64,${btoa(
                String.fromCharCode(...new Uint8Array(handleImageDownload(1)))
              )}`}
              alt="Downloaded Todo Item Image"
            />
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="add-item-container">
        <h2>Add New Item</h2>
        <input
          type="text"
          placeholder="Title"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <h4>Select Item image: </h4>
        <input
          type="file"
          accept="image/*"
          placeholder="Image URL"
          onChange={handleImageUpload}
        />

        <button className="add-button" onClick={() => handleAddItem(user)}>
          Add Item
        </button>
      </div>
    </div>
  );
};

export default TodoList;
