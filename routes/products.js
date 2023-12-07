const express = require('express');
const router = express.Router();
const ProductController = require('../app/controllers/ProductController');
const checkLogin = require('../authentication/checkToken');
const multer = require('multer')
const path = require('path');
const pathstorageimage  =  path.join(__dirname, '../public/assets/images/table/product/' )
const storage = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, pathstorageimage)
      },
      filename: function (req, file, cb) {
            cb(null, file.originalname ) ; 
      }
})
const upload = multer({ storage: storage })


router.get('/',checkLogin, ProductController.getListProducts);
router.get('/add',checkLogin, ProductController.getAddProducts);
router.get('/:id', checkLogin, ProductController.getUpdateProduct) ;

router.post('/addProduct',checkLogin,upload.single('image') ,ProductController.postAddProducts);
router.delete('/delete',checkLogin,upload.single('image'), ProductController.deleteProducts);
router.post('/updateProduct/:id',checkLogin,upload.single('image'), ProductController.updateProduct);

module.exports = router;
