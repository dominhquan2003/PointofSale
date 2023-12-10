const { Account, User, Product, Orderdetail, Order, Customer } = require('../../models');
const { Op } = require('sequelize');
const { sequelize } = require('../../config/db')
require('dotenv').config()
class CartController {
      async index(req, res) {
            const products = await Product.findAll();
            const error = req.flash('error');
            const cart = req.session.cart;
            const orderAndCustomer = await Order.findAll({
                  include: [{
                        model: Customer,
                        where: {
                              customerId: sequelize.col('Order.customerId'),
                        },
                  }],
            }) || '';

            if (!cart) {
                  req.session.cart = [];
            }

            if (cart && cart.length > 0) {
                  const cartlength = cart.length;
                  res.render('cart/cart', { products, customers: orderAndCustomer, cart: req.session.cart, cartlength, error, layout: false });
            } else {
                  const cartEmpty = "No Item Found in Cart";
                  res.render('cart/cart', { products, customers: orderAndCustomer, cart: req.session.cart, cartEmpty, error, layout: false });
            }
      }
      getCartOnload(req, res, next) {
            const cartItems = req.session.cart || [];
            if (cartItems) {
                  return res.json({
                        code: 0,
                        data: cartItems
                  });
            }
      }
      async addCart(req, res) {
            const { id } = req.body;
            // res.send(id);
            const product = await Product.findByPk(id);
            if (!req.session.cart) {
                  req.session.cart = [];
            }
            const existingProduct = (req.session.cart) ? req.session.cart.find(item => item.product_id == product.id) : '';

            if (existingProduct) {
                  existingProduct.quantity += 1;
            } else {
                  const cart_data = {
                        product_id: id,
                        product_name: product.name,
                        product_image: product.image,
                        product_price: product.retailprice,
                        quantity: 1,
                        maxquantity: product.quantity
                  };
                  req.session.cart.push(cart_data);

            }
            return res.json({
                  code: 0,
                  message: 'add to cart successfully added',
                  data: req.session.cart
            });
      }
      async searchCart(req, res) {
            const { barcodeorname } = req.body;
            try {
                  const matchingProducts = await Product.findAll({
                        where: {
                              [Op.or]: [
                                    { barcode: barcodeorname },
                                    { name: barcodeorname }
                              ]
                        }
                  });
                  var matchingProduct = matchingProducts[0]
                  if (!matchingProduct) {
                        req.flash('error', 'Product not found');
                        return res.redirect("/cart/saleInterface");

                  }
                  const existingProduct = req.session.cart.find(item => item.product_id == matchingProduct.id);

                  if (existingProduct) {

                        existingProduct.quantity += 1;
                  } else {

                        if (matchingProduct.quantity == 0) {
                              req.flash('error', 'this product was out of stock');
                              return res.redirect("/cart/saleInterface");
                        } else {
                              const cart_data = {
                                    product_id: matchingProduct.id,
                                    product_image: matchingProduct.image,
                                    product_name: matchingProduct.name,
                                    product_price: matchingProduct.retailprice,
                                    quantity: 1,
                                    maxquantity: matchingProduct.quantity
                              };
                              req.session.cart.push(cart_data);
                        }
                  }

                  res.redirect("/cart/saleInterface");
            } catch (error) {
                  console.error('Error searching cart:', error);
                  res.status(500).send('Internal Server Error');
            }

      }
      removeCart(req, res) {
            const product_id = req.query.id;
            if (!product_id) {
                  return res.json({ code: 1, message: 'Code sản phẩm không hợp lệ' });
            }
            for (let i = 0; i < req.session.cart.length; i++) {
                  if (req.session.cart[i].product_id == product_id) {
                        req.session.cart.splice(i, 1);
                        console.log(req.session.cart);
                        const cartLength = req.session.cart.length;
                        return res.json({
                              code: 0,
                              message: 'Đã xóa sản phẩm thành công',
                              cartlength: cartLength
                        });
                  }
            }
            res.redirect("/cart/saleInterface");
      }
      async cartCustomerInfor(req, res) {
            const { phone } = req.query;
            const customer = await Customer.findOne({ where: { phone: phone } })
            if (!customer) {
                  return res.json({
                        code: 1,
                        phone,
                        message: 'This is a new customer'

                  })
            }
            return res.json({
                  code: 0,
                  customer,
                  message: ' This customer is registered'
            })

      }
      updateQuantityItem(req, res) {
            const { key, value } = req.body;
            if (!key) {
                  return res.json({ code: 1, message: 'Code sản phẩm không hợp lệ' });
            } else {
                  const existingProduct = req.session.cart.find(item => item.product_id == key);
                  existingProduct.quantity = value
                  return res.json({ code: 0, quantity: value, message: 'Code sản phẩm hợp lệ' });
            }
      }
      async save(req, res) {
            const { phone_customer, name_customer, address_customer, payment_customer, total_customer } = req.body;
            const userId = req.cookies.user.id;
            const phoneCustomer = await Customer.findOne({ where: { phone: phone_customer } });
            const refund = parseInt(payment_customer - total_customer);
            const cart = req.session.cart;
            let transaction
            try {
                  transaction = await sequelize.transaction();
                  if (!phoneCustomer) {
                        const customer = await Customer.create(
                              {
                                    name: name_customer,
                                    phone: phone_customer,
                                    address: address_customer,
                              },
                              { transaction }
                        )

                        const order = await Order.create(
                              {
                                    totalprice: total_customer,
                                    payment: payment_customer,
                                    refund,
                                    customerId: customer.id,
                                    userId,
                              },
                              { transaction }
                        )
                        for (var item in cart) {
                              await Orderdetail.create({
                                    orderid: order.id,
                                    productid: cart[item].product_id,
                                    quantity: cart[item].quantity,
                                    price: cart[item].product_price
                              }, { transaction })
                              const product = await Product.findByPk(cart[item].product_id)
                              product.quantity = product.quantity - cart[item].quantity
                              await product.save({ transaction });
                        }
                        await transaction.commit();
                        req.session.order = order;
                        req.session.cart = [];
                        return res.redirect('/invoice/print');
                  } else {

                        const order = await Order.create(
                              {
                                    totalprice: total_customer,
                                    payment: payment_customer,
                                    refund,
                                    customerId: phoneCustomer.id,
                                    userId
                              },
                              { transaction }
                        )
                        for (var item in cart) {
                              await Orderdetail.create({
                                    orderid: order.id,
                                    productid: cart[item].product_id,
                                    quantity: cart[item].quantity,
                                    price: cart[item].product_price
                              }, { transaction })

                              const product = await Product.findByPk(cart[item].product_id)
                              product.quantity = product.quantity - cart[item].quantity
                              await product.save({ transaction });

                        }
                        await transaction.commit();
                        req.session.order = order;
                        req.session.cart = [];
                        return res.redirect('/invoice/print');
                  }


            } catch (error) {
                  if (transaction) {
                        await transaction.rollback();
                  }
            }
      }
}
module.exports = new CartController();