const { Account, User } = require('../../models');
require('dotenv').config()
const jwt = require('jsonwebtoken');
class HomeController {
      async index(req, res) {
            const warning = req.flash('warning') || '';
            
            if (!req.cookies.user) {
                  res.redirect('/authen/login');
            } else {
                  const name = req.cookies.user.fullname; 
                  res.render('home', { warning,name });
            }

      }

     

}
module.exports = new HomeController();