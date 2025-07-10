// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000; // Backend 5000 par chalega

app.use(cors());
app.use(express.json()); // Body-parser middleware

let todos = []; // Simple in-memory storage for todos
let nextId = 1;

// Routes
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }
  const newTodo = { id: nextId++, text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text, completed } = req.body;
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  if (text !== undefined) todos[todoIndex].text = text;
  if (completed !== undefined) todos[todoIndex].completed = completed;

  res.json(todos[todoIndex]);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter(t => t.id !== id);

  if (todos.length === initialLength) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  res.status(204).send(); // No content to send back
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});