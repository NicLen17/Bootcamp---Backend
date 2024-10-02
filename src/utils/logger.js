const {createLogger, format, transports} = require('winston')

module.exports = createLogger({
    transports:[
        new transports.Console({
            level: 'debug'
        })
    ]
})