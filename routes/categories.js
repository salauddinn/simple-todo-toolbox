const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

// Export the router first so the Todos <-> Categories require cycle resolves.
module.exports = router;

// Circular dependency edge: categories -> todos
const todos = require('./todos');

// GET /api/categories
router.get('/', async (req, res) => {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
});

// POST /api/categories
router.post('/', async (req, res) => {
    const category = await Category.create({ name: req.body.name });
    const todoCount = await todos.getTodoCount();
    res.status(201).json({ category, todoCount });
});

// Exposed to Todos through the circular edge.
module.exports.getCategoryCount = function getCategoryCount() {
    return Category.countDocuments();
};
