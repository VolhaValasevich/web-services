const mocha = require('mocha');
const logger = require("./logger.js").logger;

function MyReporter(runner) {
    mocha.reporters.Base.call(this, runner);
    let passes = 0;
    let failures = 0;

    runner.on('pass', (test) => {
        passes += 1;
        logger.pass(test.fullTitle());
    });

    runner.on('fail', (test, err) => {
        failures += 1;
        logger.fail(err.message);
    });

    runner.on('end', () => {
        logger.info(`Finished: ${passes}/${passes + failures}`);
        process.exit(failures);
    });
}

module.exports = MyReporter;