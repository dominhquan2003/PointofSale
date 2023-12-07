const { check } = require('express-validator');
module.exports = {
      Validation: [
            check('email').exists().withMessage('Please enter email').
                  notEmpty().withMessage('Email is not empty')
                  .isEmail().withMessage('Please enter a valid email address'),

            check('password').exists().withMessage('Please enter  password').
                  notEmpty().withMessage('Password is not empty')
                  .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
      ]
};