const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

// Export early to support circular dependencies
module.exports = router;

// Require todos to create a circular dependency (Categories <-> Todos)
const todos = require('./todos');

router.get('/', async (req, res) => {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
});

router.post('/', async (req, res) => {
    // Inline business logic and direct mongoose calls
    const category = await Category.create({ name: req.body.name });
    
    // Use the circular dependency
    const todoCount = typeof todos.getTodoCount === 'function' ? await todos.getTodoCount() : 0;
    
    res.status(201).json({ category, currentTodos: todoCount });
});

// Helper function for the circular dependency
module.exports.getCategoryCount = async function() {
    return await Category.countDocuments();
};
