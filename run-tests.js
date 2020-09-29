const Jasmine = require('jasmine');

const jasmine = new Jasmine();

const { SpecReporter } = require('jasmine-spec-reporter');
const AllureReporter = require('jasmine-allure-reporter');

jasmine.loadConfig({
    spec_dir: 'spec',
    spec_files: [
        '**/*[sS]pec.js',
    ],
    helpers: [
        '../log4js-config.js',
    ],
    stopSpecOnExpectationFailure: false,
    random: false,
});

jasmine.configureDefaultReporter({
    showColors: false,
});

jasmine.addReporter(
    new SpecReporter({
        suite: {
            displayNumber: true,
        },
        spec: {
            displayStackTrace: true,
            displayDuration: true,
        },
        summary: {
            displayDuration: true,
        },
    }),
);

jasmine.addReporter(new AllureReporter({
    resultsDir: 'allure-results',
}));

jasmine.execute();
