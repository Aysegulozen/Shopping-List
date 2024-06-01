import React, { useState, useEffect } from 'react';

function HomePage({ user, onSignOut }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetch('http://localhost:5033/api/shoppinglist')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data);
        if (Array.isArray(data)) {
          const formattedData = data.map(item => ({ name: item, quantity: 1 }));
          setItems(formattedData);
        }
      })
      .catch(error => console.error('Error fetching shopping list:', error));
  }, []);

  const addItem = () => {
    if (!newItem) {
      console.error('Item name is required');
      return;
    }

    fetch('http://localhost:5033/api/shoppinglist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => Promise.reject(error));
      }
      return response.json();
    })
    .then(data => {
      console.log("Added item response:", data);
      if (Array.isArray(data)) {
        const formattedData = data.map(item => ({ name: item, quantity: 1 }));
        setItems(formattedData);
      }
      setNewItem('');
    })
    .catch(error => {
      console.error('Error adding item:', error);
      if (error.errors) {
        console.error('Validation errors:', error.errors);
      }
    });
  };

  const deleteItem = (name) => {
    fetch(`http://localhost:5033/api/shoppinglist/${name}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => Promise.reject(error));
      }
      return response.json();
    })
    .then(data => {
      console.log("Deleted item response:", data);
      if (Array.isArray(data)) {
        const formattedData = data.map(item => ({ name: item, quantity: 1 }));
        setItems(formattedData);
      }
    })
    .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <button onClick={onSignOut}>Sign Out</button>
      <h1>Shopping List</h1>
      <ul>
        {Array.isArray(items) && items.map((item, index) => (
          <li key={index}>
            {item.name} (x{item.quantity}) <button onClick={() => deleteItem(item.name)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default HomePage;