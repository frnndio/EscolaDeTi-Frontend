'use strict';

var fs = require('fs');

module.exports = {
    endsWith : endsWith,
    isLintFixed : isLintFixed
};

function endsWith(str, suffix) {
    return str.indexOf('/', str.length - suffix.length) !== -1;
}

var parseString = require('xml2js').parseString;

function isLintFixed(file) {
	// Has ESLint fixed the file contents?
	return file.eslint !== null && file.eslint.fixed;
}
