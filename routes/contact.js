const router = require('express').Router();
const { body } = require('express-validator');

const contactController = require('./../controllers/contact');

router.post('/contact', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('message').isLength({ min: 5 }).withMessage('Please enter a message with at least 5 characters')
], contactController.postContact);

module.exports = router;