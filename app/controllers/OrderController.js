const { Account, User, Product, Orderdetail, Order, Customer } = require('../../models');
const { Op } = require('sequelize');
const { Sequelize } = require('../../config/db')
const moment = require('moment-timezone');


class OrderController {
      async historyPurchase(req, res) {
            const { phone } = req.query
            const customer = await Customer.findOne({ where: { phone } });
            if (!customer) {
                  return res.json({ code: 1, message: " !!!!!! THIS IS NEW CUSTOMER" });
            }
            else {
                  const orders = await Order.findAll({
                        where: {
                              customerId: customer.id,
                        }

                  });
                  return res.json({ code: 0, data: orders, message: "Get all order of customer successfully" });

            }
      }
      async getOrderdetails(req, res) {
            const id = req.query.id;

            if (!id) {
                  return res.json({
                        code: 1,
                        message: "Order id is not found",
                  })
            } else {

                  const orderDetails = await Orderdetail.findAll({
                        where: { orderid: id },
                        include: [{
                              model: Product,
                              attributes: ['id', 'name', 'image', 'retailprice'],
                              required: true,
                        }],
                  });
                  return res.json({
                        code: 0,
                        message: `List order details belong ${id}`,
                        data: orderDetails,
                  })
            }
      }
      async getOrderByTimeline(req, res) {
            try {
                  const { startDate, endDate } = req.query;

                  const startDateFormat = moment(`${startDate} 00:00:00`).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
                  const endDateFormat = moment(`${endDate} 23:59:59`).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
                  console.log(startDateFormat)
                  console.log(endDateFormat)
                  if (!startDateFormat) {
                        res.json({
                              code: 404,
                              message: 'Donot have any Orders at this time',
                        })
                        res.render('report/pages-report');
                  } else {
                        let totalOrders = 0;
                        let totalOrderPrice = 0;
                        let totalProductQuantity = 0;
                        let totalImport = 0;
                        let totalProfit = 0;
                        const orders = await Order.findAll({
                              where: {
                                    createdAt: {
                                          [Op.between]: [startDateFormat, endDateFormat],
                                    },
                              }, include: [
                                    {
                                          model: Orderdetail,
                                          include: [
                                                {
                                                      model: Product,
                                                },
                                          ],
                                    },
                              ],
                        });


                        for (const order of orders) {
                              totalOrders += 1;
                              totalOrderPrice += order.totalprice;
                              for (const orderDetail of order.Orderdetails) {
                                    totalProductQuantity += orderDetail.quantity;
                                    const productProfit = orderDetail.Product.importprice * orderDetail.quantity;
                                    totalImport += productProfit;
                              }

                        }
                        totalProfit = totalOrderPrice - totalImport;
                        res.json({
                              code: 0,
                              message: ' Get order successfully',
                              orders: orders,
                              role: req.user.role,
                              totalprice: totalOrderPrice,
                              totalOrders,
                              totalProduct: totalProductQuantity,
                              totalProfit
                        });

                  }
            } catch (error) {
                  console.error(error);
                  res.status(500).send('Internal Server Error');
            }
      }
      async getUserOrders(req, res) {
            const { id } = req.query;
            if (!id) {
                  return res.json({
                        code: 1,
                        message: 'Cannot get USER iD '
                  })
            } else {
                  const orders = await Order.findAll({ where: { userId: id } })
                  return res.json({
                        code: 0,
                        message: 'Get USER iD successfully',
                        data: orders
                  })
            }
      }


}
module.exports = new OrderController();
