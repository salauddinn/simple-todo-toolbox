const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

// Export early to support circular dependencies
module.exports = router;

// Require categories to create a circular dependency (Todos <-> Categories)
const categories = require('./categories');

// GET all todos
router.get('/', async (req, res) => {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
});

// POST a new todo
router.post('/', async (req, res) => {
    // Inline business logic directly in the route handler
    const todo = await Todo.create({ text: req.body.text });
    
    // Use the circular dependency
    const catCount = typeof categories.getCategoryCount === 'function' ? await categories.getCategoryCount() : 0;
    
    res.status(201).json({ todo, currentCategories: catCount });
});

// DELETE a todo
router.delete('/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Helper function for the circular dependency
module.exports.getTodoCount = async function() {
    return await Todo.countDocuments();
};
