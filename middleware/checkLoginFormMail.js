const { Account, User } = require('../models');
module.exports = async (req, res, next) => {
      const username = req.cookies.tokenCheckLoginMail ; 
      if (username) {
            res.clearCookie('tokenCheckLoginMail') ; 
      }
      next()
}     