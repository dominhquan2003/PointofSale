const express = require('express');
const router = express.Router();
const errorController = require('../app/controllers/ErrorController');
const checkLogin = require('../authentication/checkToken');

router.get('/',checkLogin, errorController.getError404);
router.get('/error-500',checkLogin, errorController.getError500);



module.exports = router;
