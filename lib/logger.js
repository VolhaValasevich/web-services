const {createLogger, format, transports, addColors} = require('winston');
const {combine, timestamp, label, printf} = format;
const env = require("../endpoint/test");

const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const myCustomLevels = {
    levels: {
        fail: 0,
        action: 1,
        info: 2,
        check: 3,
        pass: 4
    },
    colors: {
        fail: 'red',
        action: 'yellow',
        info: 'white',
        check: 'blue',
        pass: "green"
    }
};

addColors(myCustomLevels.colors);

class Logger {
    constructor() {
        this.logger = createLogger({
            levels: myCustomLevels.levels,
            transports: [
                new transports.Console({
                    format: combine(
                        label({label: env.uri}),
                        timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss'
                        }),
                        format.colorize({
                            all: true
                        }),
                        myFormat
                    ),
                    level: "pass"
                }),
                new transports.File({filename: 'combined.log', format: format.simple(), level: "pass"})
            ]
        });
    }
}

module.exports = new Logger();