const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store for the demo
let todos = [
    { id: 1, text: 'Learn Express', completed: false },
    { id: 2, text: 'Build a simple frontend', completed: false }
];

// GET all todos
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// POST a new todo
app.post('/api/todos', (req, res) => {
    const newTodo = {
        id: Date.now(),
        text: req.body.text,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// DELETE a todo
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    todos = todos.filter(todo => todo.id !== id);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend service is running at http://localhost:${PORT}`);
});
