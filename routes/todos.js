const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

// Export the router first so the Todos <-> Categories require cycle resolves.
module.exports = router;

// Circular dependency edge: todos -> categories
const categories = require('./categories');

// GET /api/todos
router.get('/', async (req, res) => {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
});

// POST /api/todos
router.post('/', async (req, res) => {
    const todo = await Todo.create({ text: req.body.text });
    const categoryCount = await categories.getCategoryCount();
    res.status(201).json({ todo, categoryCount });
});

// DELETE /api/todos/:id
router.delete('/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Exposed to Categories through the circular edge.
module.exports.getTodoCount = function getTodoCount() {
    return Todo.countDocuments();
};
