const express = require('express');
const router = express.Router();
const CustomerController = require('../app/controllers/CustomerController');
const checkLogin = require('../authentication/checkToken');

router.get('/',checkLogin, CustomerController.getListCustomer);
// router.get('/purchased',checkLogin, CustomerController.getPurchasedCustomer);
// router.get('/getCustomer', CustomerController.getCustomer) ;

module.exports = router;