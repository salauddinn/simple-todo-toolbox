const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todosRouter = require('./routes/todos');

function createApp() {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());

    app.get("/health", (req, res) => {
        res.json({ status: "ok" });
    });

    // Use Router group
    app.use('/api/todos', todosRouter);

    return app;
}

module.exports = { createApp };

if (require.main === module) {
    const PORT = 3001;
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/simple-todo';
    
    // Connect to MongoDB
    mongoose.connect(MONGO_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('MongoDB connection error:', err));
        
    createApp().listen(PORT, () => {
        console.log(`Backend service is running at http://localhost:${PORT}`);
    });
}
