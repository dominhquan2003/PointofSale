const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/CartController');
const OrderController = require('../app/controllers/OrderController');
const checkLogin = require('../authentication/checkToken');

router.get('/saleInterface',checkLogin, cartController.index);
router.get('/getCart',checkLogin, cartController.getCartOnload);
router.get('/remove_item',checkLogin, cartController.removeCart);
router.get('/cartCustomerInfor',checkLogin, cartController.cartCustomerInfor);

router.get('/customerHistoryPurchase',checkLogin, OrderController.historyPurchase);
router.get('/getOrderdetails',checkLogin, OrderController.getOrderdetails);



router.post('/addToCart', cartController.addCart);
router.post('/search', cartController.searchCart);
router.post('/updateQuantityItem', cartController.updateQuantityItem);
router.post('/savePurchase', cartController.save);


module.exports = router;

