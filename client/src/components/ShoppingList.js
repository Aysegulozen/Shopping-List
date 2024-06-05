import React from 'react';
import { Table, Button, TextInput, Modal } from 'flowbite-react';
import { FaStar, FaCheck, FaTrash, FaArrowUp, FaArrowDown, FaPlus } from 'react-icons/fa';

export const ShoppingListTable = ({ items, toggleImportant, toggleBought, deleteItem, moveItem, addOrIncrementItem, isBoughtList }) => {
  // SortedItems fonksiyonu değiştirilmiş hali
  const sortedItems = items.slice().sort((a, b) => {
    if (a.important && !b.important) return -1;
    if (!a.important && b.important) return 1;
    return 0;
  });

  return (
    <Table className="bg-yellow-50">
      <Table.Head>
        <Table.HeadCell className="text-black"></Table.HeadCell>
        <Table.HeadCell className="text-black">Item Name</Table.HeadCell>
        <Table.HeadCell className="text-black">Quantity</Table.HeadCell>
        <Table.HeadCell className="text-black"></Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {Array.isArray(sortedItems) && sortedItems.map((item, index) => (
          <Table.Row
            key={index}
            className={`bg-yellow-50 dark:border-gray-700 dark:bg-gray-800 ${item.important ? 'bg-yellow-200 font-bold text-black' : ''} ${item.bought ? 'line-through text-black' : ''}`}
          >
            <Table.Cell className="flex space-x-2">
              
              {!isBoughtList && (
                <>
                  <Button size="xs" color="yellow" onClick={() => toggleImportant(item.name)}>
                    <FaStar className={item.important ? 'text-yellow-500' : ''} />
                  </Button>
                  {!item.important && (
                    <>
                      <Button size="xs" color="blue" onClick={() => moveItem(item.name, -1)}>
                        <FaArrowUp />
                      </Button>
                      <Button size="xs" color="blue" onClick={() => moveItem(item.name, 1)}>
                        <FaArrowDown />
                      </Button>
                    </>
                  )}
                </>
              )}
              {isBoughtList && (
                <Button size="xs" color="blue" onClick={() => addOrIncrementItem(item.name, 1, item.quantity.split(' ')[1])}>
                  <FaPlus />
                </Button>
              )}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-large text-black text-lg">
              {item.name}
            </Table.Cell>
            <Table.Cell className="text-lg text-black">{item.quantity}</Table.Cell>
            <Table.Cell>
              <Button size="xs" color="red" onClick={() => deleteItem(item.name, isBoughtList)}>
                <FaTrash />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export const AddItemForm = ({
  newItemName,
  setNewItemName,
  newItemQuantity,
  setNewItemQuantity,
  newItemUnit,
  setNewItemUnit,
  addItem
}) => {
  const unitOptions = ['pcs', 'kg', 'gram', 'litre'];

  return (
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
  );
};

export const InfoModal = ({ modalVisible, closeModal }) => {
  return (
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
  );
};
