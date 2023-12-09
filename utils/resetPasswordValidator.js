const { check } = require('express-validator');
module.exports = {
      Validation: [
            check('username').exists().withMessage('Please enter username').
                  notEmpty().withMessage('username is not empty'),
            check('password').exists().withMessage('Please enter  password').
                  notEmpty().withMessage('Password is not empty')
                  .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
      ]
};