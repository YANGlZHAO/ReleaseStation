// rem.js

// #ifdef H5
(function flexible(window, document) {
	var docEl = document.documentElement;
	var dpr = window.devicePixelRatio || 1;

	function setRemUnit() {
		var width = docEl.clientWidth;
		if (width > 750) width = 750;
		var rem = width / 20;
		docEl.style.fontSize = rem + 'px';
	}

	setRemUnit();

	window.addEventListener('resize', setRemUnit);
	window.addEventListener('pageshow', function(e) {
		if (e.persisted) {
			setRemUnit();
		}
	});

	document.addEventListener('DOMContentLoaded', function() {
		document.body.style.fontSize = 12 * dpr + 'px';
	});
})(window, document);
// #endif