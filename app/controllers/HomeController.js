const ProductController = require('./ProductController');
class HomeController {
      async index(req, res) {
            const warning = req.flash('warning') || '';
            if (!req.cookies.user) {
                  res.redirect('/authen/login');
            } else {
                  const name = req.cookies.user.fullname;
                  let  topProductsData = await ProductController.topProducts() ; 
                  let  bestProductsData = await ProductController.BestproductsAllTime() ; 
                  console.log(bestProductsData);
                  res.render('home', { warning, name, topProductsData,bestProductsData });
            }

      }
}
module.exports = new HomeController();