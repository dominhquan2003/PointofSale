const express = require('express');
const router = express.Router();
const OrderController = require('../app/controllers/OrderController');
const checkLogin = require('../authentication/checkToken');

// router.post('/checkOutCart', OrderController.checkout);



module.exports = router;
