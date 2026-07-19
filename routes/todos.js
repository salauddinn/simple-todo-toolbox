const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

// GET all todos
router.get('/', async (req, res) => {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
});

// POST a new todo
router.post('/', async (req, res) => {
    const todo = await Todo.create({ text: req.body.text });
    res.status(201).json(todo);
});

// DELETE a todo
router.delete('/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;
