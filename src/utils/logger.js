const {createLogger, format, transports} = require('winston')

module.exports = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Formato de fecha y hora
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`; // Mensaje formateado
        })
    ),
    level: 'debug',
    transports:[
        new transports.Console(),
        new transports.File({ filename: `${__dirname}/../logs/combined.log` }),
    ]
})