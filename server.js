const express = require('express');
const jwt = require('jsonwebtoken');


    app = express();
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    controller = require('./controller');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    const routes = require('./routes')
    routes(app);

    app.listen(port);
    console.log('NodeJS Rent Book App! ' + port);