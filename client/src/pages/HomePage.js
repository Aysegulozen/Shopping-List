import React, { useState, useEffect } from 'react';
import { Table, Button, TextInput, Dropdown } from 'flowbite-react';
import { FaStar, FaCheck, FaTrash } from 'react-icons/fa';

function HomePage({ user, onSignOut }) {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('pcs');

  useEffect(() => {
    fetch('http://localhost:5033/api/shoppinglist')
      .then(response => response.json())
      .then(data => setItems(data))
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
        setItems(data);
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
    fetch(`http://localhost:5033/api/shoppinglist/${name}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        console.error('Expected array but got:', data);
      }
    })
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping List</h1>
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <TextInput
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Add new item"
          required
        />
        <TextInput
          type="number"
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(e.target.value)}
          placeholder="Quantity"
          required
        />
        <Dropdown label={newItemUnit} dismissOnClick={false}>
          <Dropdown.Item onClick={() => setNewItemUnit('pcs')}>pcs</Dropdown.Item>
          <Dropdown.Item onClick={() => setNewItemUnit('kg')}>kg</Dropdown.Item>
          <Dropdown.Item onClick={() => setNewItemUnit('g')}>gr</Dropdown.Item>
          <Dropdown.Item onClick={() => setNewItemUnit('l')}>l</Dropdown.Item>
        </Dropdown>
        <Button onClick={addItem}>Add Item</Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell></Table.HeadCell>
            <Table.HeadCell>Item Name</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {Array.isArray(items) && items.map((item, index) => (
              <Table.Row
                key={index}
                className={`bg-white dark:border-gray-700 dark:bg-gray-800 ${item.important ? 'bg-yellow-200 font-bold' : ''} ${item.bought ? 'line-through' : ''}`}
              >
                <Table.Cell className="flex space-x-2">
                  <Button size="xs" color="gray" onClick={() => toggleBought(item.name)}>
                    <FaCheck className={item.bought ? 'text-green-500' : ''} />
                  </Button>
                  <Button size="xs" color="gray" onClick={() => toggleImportant(item.name)}>
                    <FaStar className={item.important ? 'text-yellow-500' : ''} />
                  </Button>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-large text-gray-900 dark:text-white text-lg">
                  {item.name}
                </Table.Cell>
                <Table.Cell className="text-lg">{item.quantity}</Table.Cell>
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
    </div>
  );
}

export default HomePage;