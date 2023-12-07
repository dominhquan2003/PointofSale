const express = require('express');
const router = express.Router();
const ProfileController = require('../app/controllers/ProfileController');
const checkLogin = require('../authentication/checkToken');
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

router.get('/',checkLogin, ProfileController.getProfile);
router.get('/edit',checkLogin, ProfileController.getEditProfile);


router.post('/editProfile/:id',checkLogin,upload.single('image'), ProfileController.postEditProfile); 

module.exports = router;
