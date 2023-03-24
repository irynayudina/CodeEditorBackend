const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Get all items
router.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Add a new item
router.post('/items', async (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  const savedItem = await newItem.save();
  res.json(savedItem);
});

router.get('', async (req, res) => {
    const content = "this from";
    res.json(content);
})

module.exports = router;
