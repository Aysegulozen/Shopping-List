import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './Auth';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetch('http://localhost:5033/api/shoppinglist')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching shopping list:', error));
  }, []);

  const addItem = () => {
    fetch('http://localhost:5033/api/shoppinglist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
    .then(response => response.json())
    .then(data => setItems(data))
    .catch(error => console.error('Error adding item:', error));
  };

  const deleteItem = (item) => {
    fetch(`http://localhost:5033/api/shoppinglist/${item}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => setItems(data))
    .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <Auth />
        <h1>Shopping List</h1>
        <ul>
          {items.map(item => (
            <li key={item}>
              {item} <button onClick={() => deleteItem(item)}>Delete</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </header>
    </div>
  );
}

export default App;