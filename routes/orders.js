const router = require('express').Router();
const { body } = require('express-validator');

const orderController = require('./../controllers/orders');

router.post('/orders', [
    body('name').isLength({ min: 2 }).withMessage('Please enter your name'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('address').isLength({ min: 6 }).withMessage('Please enter your address'),
    body('amount').notEmpty().withMessage('Please choose an amount to donate')
], orderController.postOrder);

module.exports = router;