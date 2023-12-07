const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
      let authorization = req.cookies.Authorization 
      const user = req.cookies.user
      if (!authorization) {
            return res.render('error/pages-error-500',{ message: "You cannot access any functions in this system unless you create a new password",layout: false}); 
      }
      var token = authorization.split(' ')[1]
      if (!token) {
            return  res.render('error/pages-error-500',{ message: 'Please provide token',layout: false}); 
      }
      // const { token } = req.body
      const { JWT_SECRET_KEY } = process.env
      jwt.verify(token, JWT_SECRET_KEY, (err, data) => {
            if (err) {
                  return res.render('authentication/page-sign-in',{ message: 'Token is not valid or expired'});
            }
            req.user = data
      })

      next(); 
}
