const HomeRouter = require('./home');
const AuthRouter = require('./authen');
const ProductRouter = require('./products');
const UserRouter = require('./users');
const ProfileRouter = require('./profile');
const CategoryRouter = require('./category');
const CustomerRouter = require('./customer');
const ErrorRouter = require('./error');
const CartRouter = require('./cart');
const InvoiceRouter = require('./invoice');
const ReportRouter = require('./report');

function routes(app) {
  app.use('/', HomeRouter);

  app.use('/authen', AuthRouter);

  app.use('/invoice', InvoiceRouter);

  app.use('/cart', CartRouter);

  app.use('/products', ProductRouter);

  app.use('/categories', CategoryRouter);

  app.use('/users', UserRouter);

  app.use('/profile', ProfileRouter);

  app.use('/customers', CustomerRouter);

  app.use('/error', ErrorRouter);

  app.use('/report', ReportRouter);


  app.use((req, res, next) => {
    res.render('error/pages-error', { layout: false });
  });

}

module.exports = routes;
