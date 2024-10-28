// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client/ClientController');

// Route to add an item to the cart
router.post('/add', clientController.addItemToCart);

module.exports = router;