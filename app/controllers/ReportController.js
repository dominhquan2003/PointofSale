class ReportController {
      getReport(req, res) {
            res.render('report/pages-report');
      }
}
module.exports = new ReportController();