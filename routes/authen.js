const express = require('express');
const router = express.Router();
const authenController = require('../app/controllers/AuthenController');
const checkLogin = require('../authentication/checkToken');
const checkLoginFromMail = require('../middleware/checkLoginFormMail');
const resetPasswordValidator = require('../utils/resetPasswordValidator') ; 


router.get('/login',checkLoginFromMail, authenController.login);
router.get('/logout', authenController.logout);
router.get('/recover', authenController.recover);
router.get('/confirm-mail',checkLogin, authenController.confirmMail);
router.get('/:id',authenController.resendMail) ; 

router.post('/login', authenController.loginPost);
router.post('/recover',resetPasswordValidator.Validation, authenController.recoverPost);
router.post('/resendMail', authenController.resendMail) ;
router.post('/changePassword',checkLogin, authenController.changePassword) ;


module.exports = router;
