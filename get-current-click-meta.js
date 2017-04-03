'use strict';

var d            = require('d')
  , memoize      = require('memoizee/weak-plain')
  , htmlDocument = require('dom-ext/html-document/valid-html-document');

module.exports = memoize(function (document) {
	var timeout, meta = {};

	var reset = function () {
		timeout = null;
		Object.defineProperties(meta, {
			isRegular: d('ce', null),
			aHref: d('ce', null)
		});
	};
	reset();

	htmlDocument(document).addEventListener('click', function (event) {
		var target = event.target;

		if (timeout) clearTimeout(timeout);

		while (target && target.nodeName.toLowerCase() !== "a") target = target.parentNode;

		Object.defineProperties(meta, {
			isRegular: d('ce',
				!event.metaKey && !event.ctrlKey && (event.which !== 2) && (event.which !== 3)),
			aHref: d('ce', target || null)
		});
		setTimeout(reset);
	}, true);

	return meta;
});
