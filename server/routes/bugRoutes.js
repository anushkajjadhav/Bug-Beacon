const express = require('express');
const router = express.Router();
const Bug = require('../models/Bug');

// Get all bugs
router.get('/', async (req, res) => {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
});

// Create new bug
router.post('/', async (req, res) => {
    const bug = await Bug.create(req.body);
    const io = req.app.get('socketio');
    io.emit('bugCreated', bug); // Notify all clients
    res.status(201).json(bug);
});

// Update a bug
router.put('/:id', async (req, res) => {
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const io = req.app.get('socketio');
    io.emit('bugUpdated', bug); // Notify all clients
    res.json(bug);
});

module.exports = router;
