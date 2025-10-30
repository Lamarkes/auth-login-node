const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');

module.exports = () => {

    const app = express();

    app.set('port', process.env.PORT || config.get('server.port'));

    app.use(bodyParser.json());

    require('../api/routes/userRoutes')(app);


    return app;

}