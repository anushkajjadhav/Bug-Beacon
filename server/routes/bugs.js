const express = require('express');
const router = express.Router();
const Bug = require('../models/Bug');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Get all bugs for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const bugs = await Bug.find({ userId: req.user.id });
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add a new bug for the logged-in user
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newBug = new Bug({
      ...req.body,
      userId: req.user.id
    });
    await newBug.save();
    res.json(newBug);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ [Optional] Resolve a bug (update status)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const bug = await Bug.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json(bug);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
