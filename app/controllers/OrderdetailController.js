const { Account, User, Product, Orderdetail, Order, Customer } = require('../../models');
class OrderdetailController {
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
}
module.exports = new OrderdetailController();
