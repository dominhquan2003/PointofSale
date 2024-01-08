const { Product, Orderdetail } = require('../../models');
const moment = require('moment-timezone');
class InvoiceController {
      async getInvoice(req, res) {
            const order = req.session.order || '';
            if (order) {
                  const orderDetails = await Orderdetail.findAll({
                        where: { orderid: order.id },
                        include: [{
                              model: Product,
                              attributes: ['id', 'name'],
                              required: true,
                        }],
                  });
                  const formattedDate = moment.utc(order.createdAt).tz('Asia/Ho_Chi_Minh');
                  const ordertime  = formattedDate.format('YYYY-MM-DD HH:mm:ss');
                  
                  return res.render('invoice/pages-invoice', { order, ordertime , orderDetails, layout: false });
            } else {
                  return res.redirect('/cart/saleInterface')
            }
      }


}
module.exports = new InvoiceController();