'use strict';

var memoize      = require('memoizee/weak-plain')
  , htmlDocument = require('dom-ext/html-document/valid-html-document');

module.exports = memoize(function (document) {
	var isRegular = null
	  , reset = function () { isRegular = timeout = null; }
	  , timeout;
	htmlDocument(document).addEventListener('click', function (event) {
		isRegular = (!event.metaKey && !event.ctrlKey && (event.which !== 2) && (event.which !== 3));
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(reset, 0);
	}, true);
	return function () { return isRegular; };
});
