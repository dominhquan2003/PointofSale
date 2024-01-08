const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');
const OrderController = require('../app/controllers/OrderController');
const checkLogin = require('../authentication/checkToken');
const checkAdmin = require('../middleware/checkAdmin');
const multer = require('multer')
const path = require('path');
const pathstorageimage  =  path.join(__dirname, '../public/assets/images/user/' )
const storage = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, pathstorageimage)
      },
      filename: function (req, file, cb) {
            cb(null, file.originalname ) ; 
      }
})
const upload = multer({ storage: storage })

router.get('/',checkLogin,checkAdmin, UserController.getListUsers);
router.get('/add',checkLogin,checkAdmin, UserController.getAddUsers);
router.get('/getUserOrders',checkLogin,checkAdmin, OrderController.getUserOrders); 
router.get('/:id',checkLogin,checkAdmin, UserController.getDetailtUsers);
router.post('/add',checkLogin, upload.single('image'), UserController.addUserAccount);
router.post('/lockUser',checkLogin,  UserController.lockUser);



module.exports = router;
