const express = require('express');
const router = express.Router();
const ReportController = require('../app/controllers/ReportController');
const OrderController = require('../app/controllers/OrderController');
const OrderdetailController = require('../app/controllers/OrderdetailController');
const checkLogin = require('../authentication/checkToken');
router.get('/',checkLogin, ReportController.getReport);
router.get('/getOrder',checkLogin, OrderController.getOrderByTimeline);
router.get('/getOrderdetails',checkLogin, OrderdetailController.getOrderdetails);



module.exports = router;
