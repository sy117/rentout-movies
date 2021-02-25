const logger = require('../startup/logging');

module.exports = function(err, req, res, next){
    // log error 
    logger.error(err.message, err);
    res.status(500).send('Something Went Wrong.');
}