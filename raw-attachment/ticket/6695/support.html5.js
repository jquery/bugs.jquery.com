$(function() {
	//
	// Add jquery html5 feature detection
	//
	$.extend($.support, {
		files: typeof FileReader != 'undefined', 						// Tests for support for the HTML5 File API (http://dev.w3.org/2006/webapi/FileAPI/)
		cache: !!window.applicationCache, 							// Tests for cache manifest support (http://www.w3.org/TR/html5/offline.html#appcache)
		webdb: !!window.openDatabase, 								// Tests for webSQLDatabase support (http://dev.w3.org/html5/webdatabase/)
		geolocation: !!navigator.geolocation, 							// Tests for HTML5 geolocation support (http://www.w3.org/TR/geolocation-API/)
		history: !!(window.history && window.history.pushState && window.history.popState), // Tests for joint session history support (http://www.w3.org/TR/2009/WD-html5-20090825/history.html)
		messaging: !!window.postMessage, 						// Tests for cross-document messaging support (http://dev.w3.org/html5/postmsg/)
		microdata: !!document.getItems, 							// Tests for microdata support (http://www.w3.org/TR/html5/microdata.html)
		serverSentEvents: typeof EventSource != 'undefined', 				// Tests for server-sent event support (http://dev.w3.org/html5/eventsource/)
		localStorage: !!window.localStorage, 						// Tests for local storage support (http://dev.w3.org/html5/webstorage/#the-localstorage-attribute)
		undo: typeof UndoManager != 'undefined', 					// Tests for undo management support (http://www.w3.org/TR/2008/WD-html5-20080122/#undo)
		websockets: !!window.WebSocket, 							// Tests for WebSocket support (http://www.w3.org/TR/websockets/)
		webWorker: !!window.Worker								// Tests for Web Worker support (http://dev.w3.org/html5/workers/)
	});
});