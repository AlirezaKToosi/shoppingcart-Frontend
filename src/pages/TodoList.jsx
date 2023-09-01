// 1. Node modules
import React, { useState, useEffect } from "react";

// 2. Project file
import "../style/pages/todolist.css";
import Item from "../components/Item";
import logo from "../assets/logo.svg";

// Functionl Component (FC) with 1 line export shorcut
export default function TodoList({ user, onSignout }) {
  // 4. Local state
  const [todoItems, setTodoItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: "", price: "", image: "" });
  const [itemImageUrl, setItemImageUrl] = useState([]);

  // 5. Properties
  const endpoint_TodoitemsList = `http://localhost:8080/todo/${user}`;
  const endpoint_AddItem = `http://localhost:8080/todo/addItem/${user}`;
  // 6. Methods
  useEffect(() => {
    const fetchTodoItems = async () => {
      try {
        const response = await fetch(endpoint_TodoitemsList, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTodoItems(data);
        } else {
          console.log(response);
          alert("There are no items belonging to you.");
        }
      } catch (error) {
        alert("Sorry, we could not load the data.");
        console.error(error);
      }
    };
    fetchTodoItems();
  }, [user]);
  // 6. Methods
  const handleDeleteItem = async (itemId) => {
    const endpoint_DeleteItem = `http://localhost:8080/todo/deleteItem/${itemId}`;
    try {
      const response = await fetch(endpoint_DeleteItem, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
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
  // 6. Methods
  const handleAddItem = async () => {
    const formData = new FormData();
    formData.append("title", newItem.title);
    formData.append("price", newItem.price);
    formData.append("image", newItem.image);

    try {
      const response = await fetch(endpoint_AddItem, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const newItemData = await response.json();
        setTodoItems((prevItems) => [...prevItems, newItemData]);
        setNewItem({ title: "", price: "", image: "" });
      } else {
        alert("Failed to add item.");
      }
    } catch (error) {
      alert("An error occurred while adding the item.");
      console.error(error);
    }
  };
  // 6. Methods
  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setNewItem({ ...newItem, image: selectedFile });
    }
  };
  // 6. Methods
  const handleImageDownload = async (itemId) => {
    const endpoint_ViewImage = `http://localhost:8080/todo/display?id=${itemId}`;
    try {
      const response = await fetch(endpoint_ViewImage, {
        method: "GET",
      });

      if (response.ok) {
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setItemImageUrl(imageUrl);
      } else {
        console.error("Failed to download image");
      }
    } catch (error) {
      console.error("Error while downloading image:", error);
    }
  };
  // 7. Components
  const Items = todoItems.map((item) => (
    <Item
      key={item.id}
      item={item}
      onImageDownload={() => handleImageDownload(item.id)}
      onDelete={() => handleDeleteItem(item.id)}
    />
  ));
  // 8. Render
  return (
    <div className="todo-list-container center">
      <div className="topLogo">
        <img src={logo} alt="logo" />
      </div>
      <p className="title">{"Shopping List"}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      >
        {Items}
      </div>
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
        <button className="buttonMain" onClick={handleAddItem}>
          Add Item
        </button>
      </div>
      <button className="signout-button" onClick={onSignout}>
        Sign Out
      </button>
    </div>
  );
}
