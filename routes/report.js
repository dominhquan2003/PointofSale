const express = require('express');
const router = express.Router();
const ReportController = require('../app/controllers/ReportController');
const OrderController = require('../app/controllers/OrderController');
const checkLogin = require('../authentication/checkToken');
router.get('/',checkLogin, ReportController.getReport);
router.get('/getOrder',checkLogin, OrderController.getOrderByTimeline);
router.get('/getOrderdetails',checkLogin, OrderController.getOrderdetails);



module.exports = router;
