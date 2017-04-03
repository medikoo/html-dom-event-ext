'use strict';

var callable        = require('es5-ext/object/valid-callable')
  , object          = require('es5-ext/object/valid-object')
  , htmlDocument    = require('dom-ext/html-document/valid-html-document')
  , isExternal      = require('html-dom-ext/form/#/is-external')
  , isSubmitControl = require('html-dom-ext/submit-control/is')
  , getClickMeta    = require('./get-current-click-meta');

module.exports = function (document, location, callback/*, options*/) {
	var clickMeta, options = Object(arguments[3]), method, submitControl, lastTimeout;

	(htmlDocument(document) && object(location) && callable(callback));
	clickMeta = getClickMeta(document);

	method = (options.method == null) ? null : String(options.method).toLowerCase();
	document.addEventListener('click', function (event) {
		if (!isSubmitControl(event.target)) return;
		submitControl = event.target;
		clearTimeout(lastTimeout);
		lastTimeout = setTimeout(function () { submitControl = null; }, 0);
	});
	document.addEventListener('submit', function (event) {
		var form = event.target;
		if (clickMeta.isRegularClick === false) return;
		if (method && (form.method !== method)) return;
		if (isExternal.call(form, location.href)) return;
		event.preventDefault();
		callback(form, submitControl);
	}, false);
};
