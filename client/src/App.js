import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './Auth';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      fetch('https://localhost:5033/api/shoppinglist')
        .then(response => response.json())
        .then(data => setItems(data))
        .catch(error => console.error('Error fetching shopping list:', error));
    }
  }, [user]);

  const addItem = () => {
    fetch('https://localhost:5033/api/shoppinglist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newItem, quantity: 1 }),
    })
    .then(response => response.json())
    .then(data => setItems(data))
    .catch(error => console.error('Error adding item:', error));
  };

  const deleteItem = (name) => {
    fetch(`https://localhost:5033/api/shoppinglist/${name}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => setItems(data))
    .catch(error => console.error('Error deleting item:', error));
  };

  const onLoginSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    setUser(credentialResponse);
  };

  const onLoginFailure = () => {
    console.log('Login failed');
  };

  return (
    <div className="App">
      <header className="App-header">
        <Auth onSuccess={onLoginSuccess} onFailure={onLoginFailure} />
        {user && (
          <div>
            <h2>Welcome, User</h2>
            <h1>Shopping List</h1>
            <ul>
              {items.map(item => (
                <li key={item.name}>
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
        )}
      </header>
    </div>
  );
}

export default App;