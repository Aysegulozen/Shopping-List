// HomePage.js
import React, { useState, useEffect } from 'react';
import { Table, Button, TextInput, Modal } from 'flowbite-react';
import { FaStar, FaCheck, FaTrash, FaInfoCircle, FaArrowUp, FaArrowDown, FaUndo, FaPlus } from 'react-icons/fa';

function HomePage({ user, onSignOut }) {
  const [toBuyItems, setToBuyItems] = useState([]);
  const [boughtItems, setBoughtItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('pcs');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5033/api/shoppinglist')
      .then(response => response.json())
      .then(data => {
        const toBuy = data.filter(item => !item.bought);
        const bought = data.filter(item => item.bought);
        setToBuyItems(toBuy);
        setBoughtItems(bought);
      })
      .catch(error => console.error('Error fetching shopping list:', error));
  }, []);

  const addItem = () => {
    const newItem = {
      name: newItemName,
      quantity: `${newItemQuantity} ${newItemUnit}`,
      important: false,
      bought: false
    };

    fetch('http://localhost:5033/api/shoppinglist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        const toBuy = data.filter(item => !item.bought);
        const bought = data.filter(item => item.bought);
        setToBuyItems(toBuy);
        setBoughtItems(bought);
      } else {
        console.error('Expected array but got:', data);
      }
    })
    .catch(error => console.error('Error adding item:', error));

    setNewItemName('');
    setNewItemQuantity('');
    setNewItemUnit('pcs');
  };

  const deleteItem = (name) => {
    fetch(`http://localhost:5033/api/shoppinglist/${encodeURIComponent(name)}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete item');
        }
        return response.json();
    })
    .then(data => {
        if (Array.isArray(data)) {
            const toBuy = data.filter(item => !item.bought);
            const bought = data.filter(item => item.bought);
            setToBuyItems(toBuy);
            setBoughtItems(bought);
        } else {
            console.error('Expected array but got:', data);
        }
    })
    .catch(error => console.error('Error deleting item:', error));
  };

  const toggleImportant = (name) => {
    const updatedItems = toBuyItems.map(item =>
      item.name === name ? { ...item, important: !item.important } : item
    );
    setToBuyItems(updatedItems);
  };

  const toggleBought = (name) => {
    const itemToToggle = toBuyItems.find(item => item.name === name);
    if (itemToToggle) {
      const updatedToBuyItems = toBuyItems.filter(item => item.name !== name);
      setToBuyItems(updatedToBuyItems);
      setBoughtItems([...boughtItems, { ...itemToToggle, bought: true }]);
    } else {
      const itemToToggle = boughtItems.find(item => item.name === name);
      const updatedBoughtItems = boughtItems.filter(item => item.name !== name);
      setBoughtItems(updatedBoughtItems);
      setToBuyItems([...toBuyItems, { ...itemToToggle, bought: false }]);
    }
  };

  const moveItem = (name, direction) => {
    const index = toBuyItems.findIndex(item => item.name === name);
    if (index === -1) return;
    const newItems = [...toBuyItems];
    const [removedItem] = newItems.splice(index, 1);
    newItems.splice(index + direction, 0, removedItem);
    setToBuyItems(newItems);
  };

  const addOrIncrementItem = (name, quantity, unit) => {
    const itemIndex = toBuyItems.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
      const updatedItems = [...toBuyItems];
      const existingQuantity = parseInt(updatedItems[itemIndex].quantity.split(' ')[0], 10);
      updatedItems[itemIndex].quantity = `${existingQuantity + quantity} ${unit}`;
      setToBuyItems(updatedItems);
    } else {
      const newItem = { name, quantity: `${quantity} ${unit}`, important: false, bought: false };
      setToBuyItems([...toBuyItems, newItem]);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const sortedToBuyItems = toBuyItems.sort((a, b) => {
    if (a.important && !b.important) return -1;
    if (!a.important && b.important) return 1;
    return a.name.localeCompare(b.name);
  });

  const sortedBoughtItems = boughtItems.sort((a, b) => a.name.localeCompare(b.name));

  const unitOptions = [
    'pcs',
    'kg',
    'gram',
    'litre'
  ];

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-6xl font-bold mb-4">Shopping List</h1>
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <TextInput
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Add new item"
          className="bg-white text-black border-black"
          required
        />
        <TextInput
          type="number"
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(parseInt(e.target.value))}
          placeholder="Quantity"
          className="bg-white text-black border-black"
          required
        />
        <div className="relative">
          <select
            value={newItemUnit}
            onChange={(e) => setNewItemUnit(e.target.value)}
            className="block appearance-none w-full bg-white border border-black text-black py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            {unitOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={addItem} className="bg-blue-500 hover:bg-blue-600 text-white">Add Item</Button>
      </div>
      <div className="flex space-x-8">
        <div className="w-1/2">
          <h2 className="text-3xl font-bold mb-4">To Buy</h2>
          <Table className="bg-yellow-50">
            <Table.Head>
              <Table.HeadCell className="text-black"></Table.HeadCell>
              <Table.HeadCell className="text-black">Item Name</Table.HeadCell>
              <Table.HeadCell className="text-black">Quantity</Table.HeadCell>
              <Table.HeadCell className="text-black"></Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {Array.isArray(sortedToBuyItems) && sortedToBuyItems.map((item, index) => (
                <Table.Row
                  key={index}
                  className={`bg-yellow-50 dark:border-gray-700 dark:bg-gray-800 ${item.important ? 'bg-yellow-200 font-bold text-black' : ''} ${item.bought ? 'line-through text-black' : ''}`}
                >
                  <Table.Cell className="flex space-x-2">
                    <Button size="xs" color="green" onClick={() => toggleBought(item.name)}>
                      <FaCheck className={item.bought ? 'text-green-500' : ''} />
                    </Button>
                    <Button size="xs" color="yellow" onClick={() => toggleImportant(item.name)}>
                      <FaStar className={item.important ? 'text-yellow-500' : ''} />
                    </Button>
                    <Button size="xs" color="blue" onClick={() => moveItem(item.name, -1)}>
                      <FaArrowUp />
                    </Button>
                    <Button size="xs" color="blue" onClick={() => moveItem(item.name, 1)}>
                      <FaArrowDown />
                    </Button>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-large text-black text-lg">
                    {item.name}
                  </Table.Cell>
                  <Table.Cell className="text-lg text-black">{item.quantity}</Table.Cell>
                  <Table.Cell>
                    <Button size="xs" color="red" onClick={() => deleteItem(item.name)}>
                      <FaTrash />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div className="w-1/2">
          <h2 className="text-3xl font-bold mb-4">Bought</h2>
          <Table className="bg-yellow-50">
            <Table.Head>
              <Table.HeadCell className="text-black"></Table.HeadCell>
              <Table.HeadCell className="text-black">Item Name</Table.HeadCell>
              <Table.HeadCell className="text-black">Quantity</Table.HeadCell>
              <Table.HeadCell className="text-black"></Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {Array.isArray(sortedBoughtItems) && sortedBoughtItems.map((item, index) => (
                <Table.Row
                  key={index}
                  className={`bg-yellow-50 dark:border-gray-700 dark:bg-gray-800 ${item.bought ? 'line-through text-black' : ''}`}
                >
                  <Table.Cell className="flex space-x-2">
                    <Button size="xs" color="green" onClick={() => toggleBought(item.name)}>
                      <FaUndo className={item.bought ? 'text-green-500' : ''} />
                    </Button>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-large text-black text-lg">
                    {item.name}
                  </Table.Cell>
                  <Table.Cell className="text-lg text-black">{item.quantity}</Table.Cell>
                  <Table.Cell>
                    <Button size="xs" color="red" onClick={() => deleteItem(item.name)}>
                      <FaTrash />
                    </Button>
                    <Button size="xs" color="blue" onClick={() => addOrIncrementItem(item.name, 1, item.unit)}>
                      <FaPlus />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>

      <div className="mt-4">
        <Button onClick={openModal} className="bg-gray-500 hover:bg-gray-600 text-white">
          <FaInfoCircle className="mr-2" /> How to Use
        </Button>
      </div>

      <Modal show={modalVisible} onClose={closeModal}>
        <Modal.Header>
          How to Use
        </Modal.Header>
        <Modal.Body>
          <p><FaStar className="inline text-yellow-500" /> Mark an item as important</p>
          <p><FaCheck className="inline text-green-500" /> Mark an item as bought</p>
          <p><FaTrash className="inline text-red-500" /> Delete an item</p>
          <p>To add an item, enter the name and quantity, select the unit, and click "Add Item".</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal} className="bg-blue-500 hover:bg-blue-600 text-white">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HomePage;
