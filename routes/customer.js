const express = require('express');
const router = express.Router();
const customerController = require('../app/controllers/CustomerController');
const checkLogin = require('../authentication/checkToken');

router.get('/',checkLogin, customerController.getListCustomer);


module.exports = router;