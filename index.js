const express = require('express');
const app = express();
require('express-async-errors');
require('dotenv').config()
const $env = process.env;
const PORT = $env.PORT || 8080;

const logger = require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')($env);
require('./startup/config')($env);
require('./startup/validation')();


app.get('/', (req, res) =>{
    res.send('Successfully reached VIDLY APIs.');
});


app.listen(PORT, () =>{
    logger.info(`Server Listening on port :: ${PORT}`);
})