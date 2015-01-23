'use strict';

var memoize      = require('memoizee/weak-plain')
  , htmlDocument = require('dom-ext/html-document/valid-html-document');

module.exports = memoize(function (document) {
	var isNatural = true, timeout;
	var reset = function () {
		isNatural = true;
		timeout = null;
	};
	htmlDocument(document).addEventListener('click', function (event) {
		if (event.metaKey || event.ctrlKey || (event.which === 2) || (event.which === 3)) {
			isNatural = false;
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(reset, 0);
		}
	}, true);
	return function () { return isNatural; };
});
