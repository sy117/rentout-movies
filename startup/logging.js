const winston = require('winston');
require('winston-mongodb');
require('dotenv').config();

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            format: winston.format.json()
        }),
        new winston.transports.MongoDB({
            db: process.env.DB_URL,
            level: 'error',
            format: winston.format.json()
        }),
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        })
    ]
});

module.exports = logger;