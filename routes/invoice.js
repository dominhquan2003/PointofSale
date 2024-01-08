const express = require('express');
const router = express.Router();
const invoiceController = require('../app/controllers/InvoiceController');
router.get('/print', invoiceController.getInvoice);
module.exports = router;
