const express = require('express');
const router = express.Router();
const categoryController = require('../app/controllers/CategoryController');
const checkLogin = require('../authentication/checkToken');
const checkAdmin = require('../middleware/checkAdmin');
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


router.get('/',checkLogin,checkAdmin, categoryController.getListCategories);

router.get('/add',checkLogin,checkAdmin, categoryController.getAddCategories);

router.post('/add',checkLogin,checkAdmin, upload.single('image'), categoryController.addCategories);

router.get('/:code',checkLogin,checkAdmin, categoryController.getUpdateCategories);

router.post('/update/:code',checkLogin,checkAdmin, categoryController.updateCategories )

router.delete('/delete',checkLogin,checkAdmin, categoryController.deleteCategories);

module.exports = router;