import React, { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { ShoppingListTable, AddItemForm, InfoModal } from '../components/ShoppingList';
import { FaInfoCircle } from 'react-icons/fa';

function HomePage({ user, onSignOut }) {
  const [toBuyItems, setToBuyItems] = useState([]);
  const [boughtItems, setBoughtItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('pcs');
  const [modalVisible, setModalVisible] = useState(false);
  const userId = user?.email || 'guest@example.com';

  useEffect(() => {
    fetch(`http://localhost:5033/api/shoppinglist/${userId}`)
      .then(response => response.json())
      .then(data => {
        const toBuy = data.filter(item => !item.bought);
        const bought = data.filter(item => item.bought);
        setToBuyItems(toBuy);
        setBoughtItems(bought);
      })
      .catch(error => console.error('Error fetching shopping list:', error));
  }, [userId]);

  const saveItems = (updatedItems) => {
    fetch(`http://localhost:5033/api/shoppinglist/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItems),
    })
      .then(response => response.json())
      .then(data => {
        const toBuy = data.filter(item => !item.bought);
        const bought = data.filter(item => item.bought);
        setToBuyItems(toBuy);
        setBoughtItems(bought);
      })
      .catch(error => console.error('Error saving shopping list:', error));
  };

  const addItem = () => {
    const newItem = {
      name: newItemName,
      quantity: `${newItemQuantity} ${newItemUnit}`,
      important: false,
      bought: false
    };

    const updatedToBuyItems = [...toBuyItems, newItem];
    saveItems(updatedToBuyItems.concat(boughtItems));

    setNewItemName('');
    setNewItemQuantity('');
    setNewItemUnit('pcs');
  };

  const deleteItem = (name, fromBoughtList = false) => {
    const updatedToBuyItems = toBuyItems.filter(item => item.name !== name);
    const updatedBoughtItems = fromBoughtList ? boughtItems.filter(item => item.name !== name) : boughtItems;

    saveItems(updatedToBuyItems.concat(updatedBoughtItems));
  };

  const toggleImportant = (name) => {
    const updatedItems = toBuyItems.map(item =>
      item.name === name ? { ...item, important: !item.important } : item
    );
    saveItems(updatedItems.concat(boughtItems));
  };

  const toggleBought = (name) => {
    const itemToToggle = toBuyItems.find(item => item.name === name);
    if (itemToToggle) {
      const updatedToBuyItems = toBuyItems.filter(item => item.name !== name);
      const updatedBoughtItems = [...boughtItems, { ...itemToToggle, bought: true, important: false }];
      saveItems(updatedToBuyItems.concat(updatedBoughtItems));
    } else {
      const itemToToggle = boughtItems.find(item => item.name === name);
      const updatedBoughtItems = boughtItems.filter(item => item.name !== name);
      const updatedToBuyItems = [...toBuyItems, { ...itemToToggle, bought: false }];
      saveItems(updatedToBuyItems.concat(updatedBoughtItems));
    }
  };

  const moveItem = (name, direction) => {
    const index = toBuyItems.findIndex(item => item.name === name);
    if (index === -1) return;
    const newItems = [...toBuyItems];
    const [removedItem] = newItems.splice(index, 1);
    newItems.splice(index + direction, 0, removedItem);
    saveItems(newItems.concat(boughtItems));
  };

  const addOrIncrementItem = (name, quantity, unit) => {
    const itemIndex = toBuyItems.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
      const updatedItems = [...toBuyItems];
      const existingQuantity = parseInt(updatedItems[itemIndex].quantity.split(' ')[0], 10);
      updatedItems[itemIndex].quantity = `${existingQuantity + quantity} ${unit}`;
      saveItems(updatedItems.concat(boughtItems));
    } else {
      const newItem = { name, quantity: `${quantity} ${unit}`, important: false, bought: false };
      saveItems([...toBuyItems, newItem].concat(boughtItems));
    }
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
            items={toBuyItems}
            toggleImportant={toggleImportant}
            toggleBought={toggleBought}
            deleteItem={deleteItem}
            moveItem={moveItem}
            addOrIncrementItem={addOrIncrementItem}
          />
        </div>
        <div className="w-1/2">
          <h2 className="text-3xl font-bold mb-4">Bought</h2>
          <ShoppingListTable
            items={boughtItems}
            toggleImportant={toggleImportant}
            toggleBought={toggleBought}
            deleteItem={(name) => deleteItem(name, true)}
            moveItem={moveItem}
            addOrIncrementItem={addOrIncrementItem}
            isBoughtList
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
