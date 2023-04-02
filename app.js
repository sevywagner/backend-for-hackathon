const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));

const orderRouter = require('./routes/orders');
const contactRouter = require('./routes/contact');

app.use(orderRouter);
app.use(contactRouter);

app.use((error, req, res, next) => {
    res.status(error.statusCode).json({
        error: error.message
    });
})

mongoConnect(() => {
    app.listen(process.env.PORT || 8080);
});