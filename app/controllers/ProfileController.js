const { User, Account } = require('../../models');
const jwt = require('jsonwebtoken');
class ProfileController{
      async getProfile(req,res,next){
            let authorization = req.cookies.Authorization  ; 
            var token = authorization.split(' ')[1]
            jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, data) => {
                  if (err) {
                        return res.render('authentication/page-sign-in',{ message: 'Token is not valid or expired'});
                  }else {
                        const account = await Account.findOne({ where: { username: data.username } });
                        const user = await User.findOne({ where: { accountId: account.id } });
                        req.session.user = user ; 
                        req.session.account = account ; 
                        res.render('profile/user-profile',{user,account});
                  }
            })
           
      }
      getEditProfile(req,res,next){
            let authorization = req.cookies.Authorization  ; 
            var token = authorization.split(' ')[1] ; 
            const error = req.flash('error') || '' ; 
            const success = req.flash('success') || '' ;
            jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, data) => {
                  if (err) {
                        return res.render('authentication/page-sign-in',{ message: 'Token is not valid or expired'});
                  }else {
                        const account = await Account.findOne({ where: { username: data.username } });
                        const user = await User.findOne({ where: { accountId: account.id } });
                        res.render('profile/user-profile-edit',{user,error,success});
                  }
            })
            
      }
      async postEditProfile(req,res,next){
            const id = req.params.id;
            const file = req.file;
            if (file === undefined) {
                  res.redirect('/profile/') ; 
            } else{
               console.log(file.originalname);
               const user = await User.findByPk(id);
               user.avatar = file.originalname;
               await user.save() ;
               req.flash('success','Your avatar are updated successfully') ;
               res.redirect('/profile/') ; 
                  
            }

            
      }
}

module.exports = new ProfileController()  ; 