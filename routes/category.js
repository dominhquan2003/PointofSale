const express = require('express');
const router = express.Router();
const CategoryController = require('../app/controllers/CategoryController');
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


router.get('/',checkLogin,checkAdmin, CategoryController.getListCategories);

router.get('/add',checkLogin,checkAdmin, CategoryController.getAddCategories);

router.post('/add',checkLogin,checkAdmin, upload.single('image'), CategoryController.addCategories);

router.get('/:code',checkLogin,checkAdmin, CategoryController.getUpdateCategories);

router.post('/update/:code',checkLogin,checkAdmin, CategoryController.updateCategories )

router.delete('/delete',checkLogin,checkAdmin, CategoryController.deleteCategories);

module.exports = router;