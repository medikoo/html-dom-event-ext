'use strict';

var dispatchEvent = require('dom-ext/html-element/#/dispatch-event-2');

module.exports = function (t, a, d) {
	var clickMeta = t(document);
	a(clickMeta.isRegular, null);
	dispatchEvent.call(document.documentElement, 'click', { metaKey: true });
	a(clickMeta.isRegular, false);
	setTimeout(function () {
		a(clickMeta.isRegular, null);
		d();
	}, 0);
};
