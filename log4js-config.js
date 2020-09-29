const log4js = require('log4js');

log4js.configure({
    appenders: {
        out: {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern: '%[[%d{ABSOLUTE}] [%4.4p] [%12.12c] -%] %m',
            },
        },
    },
    categories: {
        default: {
            appenders: ['out'],
            level: 'debug',
        },
    },
});
