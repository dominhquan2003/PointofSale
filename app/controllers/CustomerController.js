
const { Customer } = require('../../models');
require('dotenv').config()
class CustomerController {
      async getListCustomer(req, res, next) {
           const customers = await Customer.findAll() ; 
            res.render('customer/page-list-customers',{customers}) ;
      }
     
}
module.exports = new CustomerController() 