
const { Account, User, Product, Orderdetail, Order, Customer } = require('../../models');
const { Op } = require('sequelize');
const { sequelize } = require('../../config/db')
require('dotenv').config()
class CustomerController {
      async getListCustomer(req, res, next) {
           const customers = await Customer.findAll() ; 
            res.render('customer/page-list-customers',{customers}) ;
      }
     
}




module.exports = new CustomerController() 