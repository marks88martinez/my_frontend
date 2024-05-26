import React, { useEffect, useState } from 'react';
import { getItems, createItem, updateItem, deleteItem } from './api';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

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
   clearForm();
    fetchItems();
  };

  const clearForm = () => {
    setName('');
    setDescription('');
  }

  const handleEdit = (item) => {
    setName(item.name);
    setDescription(item.description);
    setEditingItem(item);
    
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    clearForm();
    setEditingItem(null);
    fetchItems();
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Items</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              {editingItem ? 'Update' : 'Create'}
            </Button>
          </Form>
          <ListGroup className="mt-5">
            {items.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col>{item.name}</Col>
                  <Col>{item.description}</Col>
                  <Col className="text-end">
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
