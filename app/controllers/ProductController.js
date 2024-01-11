const { Category, Product, Orderdetail } = require('../../models');
const { Op } = require('sequelize');
const { sequelize } = require('../../config/db')
class ProductController {
      async getListProducts(req, res, next) {
            try {
                  const success = req.flash('success') || '';
                  const warning = req.flash('warning') || '';
                  const error = req.flash('error') || '';
                  const products = await Product.findAll({
                        include: { model: Category, as: 'Category' }
                  });
                  if (req.user.role === 'Admin') {
                        const role = 'Admin';
                        console.log(role);
                        res.render('products/page-list-product', { products, success, role, warning, error });
                  } else {
                        return res.render('products/page-list-product', { products, success, warning, error });
                  }
            } catch (error) {
                  console.log('Error fetching categories:', error);

            }
      }
      async getAddProducts(req, res, next) {

            const error = req.flash('error');
            const categories = await Category.findAll();
            return res.render('products/page-add-product', { categories, error });

      }
      async getUpdateProduct(req, res, next) {
            try {
                  const error = req.flash('error');
                  const product = await Product.findOne({ where: { id: req.params.id } });
                  const brandname = await Category.findByPk(product.categoryid);
                  res.render('products/page-update-product', { product, brandname, error });
            } catch (error) {
                  console.log('Error fetching categories:', error);

            }
      }
      async postAddProducts(req, res, next) {
            const { name, rprice, iprice, barcode, quantity, categoryid } = req.body;
            const file = req.file;
            const productExistName = await Product.findOne({
                  where: { name }
            })
            const productExistBarcode = await Product.findOne({
                  where: { barcode }
            })
            if (categoryid === undefined) {
                  res.redirect('/categories/add')
            }
            if (!productExistName && !productExistBarcode) {
                  try {
                        await Product.create({ name, barcode, retailprice: rprice, importprice: iprice, quantity, categoryid, image: file.originalname });
                        return res.redirect('/products/');
                  } catch (error) {
                        console.log('Error fetching categories:', error);

                  }
            } else {
                  req.flash('error', 'Name và barcode must be unique.');
                  res.redirect('/products/add');
            }

      }
      async deleteProducts(req, res, next) {
            const id = req.body.id;

            if (!id) {
                  return res.json({ code: 1, message: 'Code sản phẩm không hợp lệ' });
            }
            const orderdetail = await Orderdetail.findOne({ where: { productid: id } });
            if (!orderdetail) {
                  await Product.destroy({ where: { id: id } })
                  if (req.session.cart) {
                        for (let i = 0; i < req.session.cart.length; i++) {
                              if (req.session.cart[i].product_id == id) {
                                    req.session.cart.splice(i, 1); // Remove the product from the cart
                                    break;
                              }
                        }
                  }
                  return res.json({ code: 0, message: 'Đã xóa sản phẩm thành công' });
            } else {

                  return res.json({ code: 1, message: 'Sản phẩm đã được lên đơn' })
            }
      }
      async updateProduct(req, res, next) {
            const file = req.file;
            const { name, barcode, iprice, rprice, quantity } = req.body
            const id = req.params.id;
            const prodduct = await Product.findOne({ where: { id: id } })
            if (file === undefined) {
                  prodduct.name = name;
                  prodduct.barcode = barcode;
                  prodduct.importprice = iprice;
                  prodduct.retailprice = rprice;
                  prodduct.quantity = quantity;
                  await prodduct.save();
                  if (req.session.cart) {
                        for (let i = 0; i < req.session.cart.length; i++) {
                              if (req.session.cart[i].product_id == id) {
                                    req.session.cart[i].product_name = name;
                                    req.session.cart[i].product_price = rprice;
                                    req.session.cart[i].maxquantity = quantity;


                              }
                        }
                  }
                  req.flash('success', 'Updated product Successfully');
                  return res.redirect('/products/');
            } else {
                  prodduct.name = name;
                  prodduct.barcode = barcode;
                  prodduct.iprice = iprice;
                  prodduct.rprice = rprice;
                  prodduct.quantity = quantity;
                  prodduct.image = file.originalname;
                  await prodduct.save();
                  if (req.session.cart) {
                        for (let i = 0; i < req.session.cart.length; i++) {
                              if (req.session.cart[i].product_id == id) {
                                    req.session.cart[i].product_name = name;
                                    req.session.cart[i].product_price = parseFloat(rprice);
                                    req.session.cart[i].maxquantity = quantity;
                                    req.session.cart[i].product_image = file.originalname;
                              }
                        }
                  }
                  req.flash('success', 'Updated product Successfully');
                  return res.redirect('/products/');
            }

      }
      async topProducts() {
            const topProductsOrderdetail = await Orderdetail.findAll({
                  attributes: ['productid', [sequelize.fn('SUM', sequelize.col('Orderdetail.quantity')), 'totalQuantity']],
                  group: ['productid'],
                  order: [[sequelize.literal('totalQuantity'), 'DESC']],
                  limit: 4,
                  include: [
                        {
                              model: Product,
                              required: true
                        }
                  ]
            });
            const topProductsData = topProductsOrderdetail.map(orderDetail => orderDetail.get({ plain: true }));
            return topProductsData;
      }
      async BestproductsAllTime() {
            const bestProducts = await Orderdetail.findAll({
                  attributes: [
                        'productid',
                        [
                              sequelize.literal(
                                    `(SUM(Orderdetail.quantity) * product.retailprice) - (SUM(Orderdetail.quantity) * product.importprice)`
                              ),
                              'totalEarnings'
                        ],
                        [sequelize.fn('SUM', sequelize.col('Orderdetail.quantity')), 'totalQuantity']
                  ],
                  group: ['productid'],
                  order: [[sequelize.literal('totalEarnings'), 'DESC']],
                  limit: 3,
                  include: [
                        {
                              model: Product,
                              required: true
                        }
                  ]
            });
            const bestProductsData = bestProducts.map(orderDetail => orderDetail.get({ plain: true }));
            return bestProductsData;
      }
}
module.exports = new ProductController() 