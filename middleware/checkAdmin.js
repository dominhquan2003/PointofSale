module.exports = (req,res,next) => {      
      const role  = req.user.role;
      if (role === 'Admin') {
            next();
      }else {
            req.flash('warning', 'You donot have permission to access this page.');
            return res.redirect('/') ;
            
      }
      
}     