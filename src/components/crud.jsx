import React, { useEffect, useState } from 'react';
import { getItems, createItem, updateItem, deleteItem } from './api';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await getItems();
    setItems(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await updateItem(editingItem.id, { name, description });
      setEditingItem(null);
    } else {
      await createItem({ name, description });
    }
    setName('');
    setDescription('');
    fetchItems();
  };

  const handleEdit = (item) => {
    setName(item.name);
    setDescription(item.description);
    setEditingItem(item);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchItems();
  };

  return (
    <div>
      <h1>Items</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <button type="submit">{editingItem ? 'Update' : 'Create'}</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.name} - {item.description}</span>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
