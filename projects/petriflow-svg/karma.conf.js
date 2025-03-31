// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

process = require('process')
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-firefox-launcher'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-mocha-reporter'),
            require('karma-nyan-reporter'),
            require('karma-junit-reporter'),
            require('karma-sonarqube-unit-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],

        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
            jasmine: {
                timeoutInterval: 30000
            }
        },

        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, '../../coverage/petriflow-svg'),
            reports: ['html', 'text-summary', 'json-summary', 'lcov'],
            fixWebpackSourcePaths: true
        },
        nyanReporter: {
            suppressErrorReport: false,
            suppressErrorHighlighting: false,
            numberOfRainbowLines: 4,
            renderOnRunCompleteOnly: true
        },
        junitReporter: {
            outputDir: "../../coverage/petriflow-svg/",
            outputFile: "JUNITX-test-report.xml",
            suite: "petriflow.svg",
            useBrowserName: false,
            nameFormatter: undefined,
            classNameFormatter: undefined,
            properties: {},
            xmlVersion: null
        },
        sonarQubeUnitReporter: {
            sonarQubeVersion: 'LATEST',
            outputFile: '../../coverage/petriflow-svg/sonarqube-report.xml',
            useBrowserName: false
        },

        customLaunchers: {
            ChromeHeadlessCI: {
                base: 'ChromeHeadless',
                flags: [
                    '--no-sandbox',
                    '--headless',
                    '--disable-gpu',
                    '--disable-translate',
                    '--disable-extensions',
                    '--disable-dev-shm-usage'
                ]
            }
        },

        reporters: ['progress', 'kjhtml', 'coverage-istanbul', 'nyan', 'junit', 'sonarqubeUnit'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadlessCI'],
        // browsers: ['Chrome'],
        singleRun: true,
        restartOnFileChange: false
    });
};
