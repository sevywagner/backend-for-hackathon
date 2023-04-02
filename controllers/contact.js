const { createTransport } = require('nodemailer');
const { validationResult } = require('express-validator')

const transport = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'sevywagner@gmail.com',
        pass: process.env.TRANSPORT_PASS
    }
});

exports.postContact = (req, res, next) => {
    const email = req.body.email;
    const message = req.body.message;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.statusCode = 422;
        console.log(error.message);
        throw error;
    }

    transport.sendMail({
        from: email,
        to: 'sevywagner@gmail.com',
        subject: 'Contact form submission',
        text: message
    });

    res.status(200).json({
        message: 'Message Sent'
    });
}