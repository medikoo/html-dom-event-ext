'use strict';

var dispatchEvent = require('dom-ext/html-element/#/dispatch-event-2');

module.exports = function (t, a, d) {
	var isNatural = t(document);
	a(isNatural(), true);
	dispatchEvent.call(document.documentElement, 'click', { metaKey: true });
	a(isNatural(), false);
	setTimeout(function () {
		a(isNatural(), true);
		d();
	}, 0);
};
