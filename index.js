var _ = require('lodash');
var rlCSV = require('reflib-csv');

var parse = function(data, options) {
	var settings = {
		delimiter: '\t',
		...options,
	};

	return rlCSV.parse(data, settings);
};

var output = function(options) {
	var settings = {
		delimiter: '\t',
		...options,
	};

	return rlCSV.output(settings);
};

module.exports = {
	output: output,
	parse: parse,
};
