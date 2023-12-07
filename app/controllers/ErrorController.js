class ErrorController{
      getError404(req, res) {
            res.render('error/pages-error',{layout: false});
      }
      getError500(req, res) {
            res.render('error/pages-error-500',{layout: false});
      }
      
}
module.exports = new ErrorController() ;