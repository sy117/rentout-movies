const mongoose = require('mongoose');
const logger = require('./logging');

module.exports = function($env){
    // Connect to database
    mongoose.connect($env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => { logger.info('Connected to MongoDB...');})
        .catch(err => logger.error('Could not connect to MongoDB...', err));
}