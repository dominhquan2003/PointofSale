const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/HomeController');
const checkLogin = require('../authentication/checkToken');

router.get('/', homeController.index);


module.exports = router;
