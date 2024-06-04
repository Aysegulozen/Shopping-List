import React, { useState, useEffect } from 'react';
import { Button } from 'flowbite-react'; // Button bileşenini içe aktarın
import { ShoppingListTable, AddItemForm, InfoModal } from '../components/ShoppingList';
import { FaInfoCircle } from 'react-icons/fa';

function HomePage({ user, onSignOut }) {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('pcs');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const userId = user ? user.email : 'guest@example.com';
    fetch(`http://localhost:5033/api/shoppinglist/${userId}`)
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching shopping list:', error));
  }, [user]);

  const addItem = () => {
    const newItem = {
      name: newItemName,
      quantity: `${newItemQuantity} ${newItemUnit}`,
      important: false,
      bought: false
    };

    const userId = user ? user.email : 'guest@example.com';
    fetch(`http://localhost:5033/api/shoppinglist/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...items, newItem]),
    })
    .then(response => response.json())
    .then(data => setItems(data))
    .catch(error => console.error('Error adding item:', error));

    setNewItemName('');
    setNewItemQuantity('');
    setNewItemUnit('pcs');
  };

  const deleteItem = (name) => {
    const userId = user ? user.email : 'guest@example.com';
    fetch(`http://localhost:5033/api/shoppinglist/${userId}/${encodeURIComponent(name)}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => setItems(data))
    .catch(error => console.error('Error deleting item:', error));
  };

  const toggleImportant = (name) => {
    const updatedItems = items.map(item =>
      item.name === name ? { ...item, important: !item.important } : item
    );
    setItems(updatedItems);
  };

  const toggleBought = (name) => {
    const updatedItems = items.map(item =>
      item.name === name ? { ...item, bought: !item.bought } : item
    );
    setItems(updatedItems);
  };

  const addOrIncrementItem = (name, quantity, unit) => {
    const updatedItems = items.map(item =>
      item.name === name ? { ...item, quantity: parseInt(item.quantity) + quantity + ' ' + unit } : item
    );
    setItems(updatedItems);
  };

  const moveItem = (name, direction) => {
    const index = items.findIndex(item => item.name === name);
    if (index === -1) return;
    const newItems = [...items];
    const [removedItem] = newItems.splice(index, 1);
    newItems.splice(index + direction, 0, removedItem);
    setItems(newItems);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-6xl font-bold mb-4">Shopping List</h1>
      <AddItemForm
        newItemName={newItemName}
        setNewItemName={setNewItemName}
        newItemQuantity={newItemQuantity}
        setNewItemQuantity={setNewItemQuantity}
        newItemUnit={newItemUnit}
        setNewItemUnit={setNewItemUnit}
        addItem={addItem}
      />
      <div className="flex space-x-8">
        <div className="w-1/2">
          <h2 className="text-3xl font-bold mb-4">To Buy</h2>
          <ShoppingListTable
            items={items.filter(item => !item.bought)}
            toggleImportant={toggleImportant}
            toggleBought={toggleBought}
            deleteItem={deleteItem}
            addOrIncrementItem={addOrIncrementItem}
            moveItem={moveItem}
          />
        </div>
        <div className="w-1/2">
          <h2 className="text-3xl font-bold mb-4">Bought</h2>
          <ShoppingListTable
            items={items.filter(item => item.bought)}
            toggleImportant={toggleImportant}
            toggleBought={toggleBought}
            deleteItem={deleteItem}
            addOrIncrementItem={addOrIncrementItem}
            moveItem={moveItem}
            isBoughtList={true}
          />
        </div>
      </div>
      <div className="mt-4">
        <Button onClick={openModal} className="bg-gray-500 hover:bg-gray-600 text-white">
          <FaInfoCircle className="mr-2" /> How to Use
        </Button>
      </div>
      <InfoModal modalVisible={modalVisible} closeModal={closeModal} />
    </div>
  );
}

export default HomePage;
