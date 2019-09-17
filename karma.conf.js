//process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
  config.set({
    basePath: '.',

    frameworks: ['jasmine'],
	client: {
		jasmine: {
		  timeoutInterval: 20000
		}
	  },

    files: [
		'node_modules/crossfilter2/crossfilter.min.js',
		'node_modules/lodash/index.js',
		'reductio.min.js',
		'test/**/*.spec.js'
    ],

	browsers: [
		 'Chrome'
		// 'ChromeCanary',
		// 'Firefox',
		//'PhantomJS'
		// 'PhantomJS'
		//'ChromeHeadlessCustom'
	],

	plugins: [
		'karma-jasmine',
		'karma-chrome-launcher'
		//'karma-firefox-launcher',
		//'karma-phantomjs-launcher'
		//require('karma-jasmine'),
        //require('karma-chrome-launcher')
	],
	/*
	customLaunchers: {
		'ChromeHeadlessCustom': {
			base: 'ChromeHeadless',
			flags: [
				'--no-sandbox',
				'--headless',
				'--disable-gpu',
				'--disable-translate',
				'--disable-extensions'
			]
		}
	}, */

	reporters: ['dots'],

	singleRun: true,

	captureTimeout: 60000,
	browserDisconnectTolerance: 3, 
	browserDisconnectTimeout : 210000,
	browserNoActivityTimeout : 210000
  });
};
