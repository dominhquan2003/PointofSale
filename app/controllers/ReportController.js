const { Account, User, Product, Orderdetail, Order, Customer } = require('../../models');
const { Op } = require('sequelize');
const { Sequelize } = require('../../config/db')
const moment = require('moment');
class ReportController {
      getReport(req, res) {
            res.render('report/pages-report');
      }
}
module.exports = new ReportController();