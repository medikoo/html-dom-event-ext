'use strict';

var dispatchEvent = require('dom-ext/html-element/#/dispatch-event-2');

module.exports = function (t, a, d) {
	var clickMeta = t(document), stamp = Date.now();
	a(clickMeta.isRegular, null);
	dispatchEvent.call(document.documentElement, 'click', { metaKey: true });
	a(clickMeta.isRegular, false);
	a(clickMeta.stamp > stamp, true);
	setTimeout(function () {
		a(clickMeta.isRegular, null);
		a(clickMeta.stamp > stamp, true);
		d();
	}, 0);
};
