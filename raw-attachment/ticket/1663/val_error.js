// example of potentially-broken use of .val() on non-form elements

Analytics = new (function() {
	var beacon = "beacon.gif";
	
	// get the page load time
	var start_time = new Date().getTime();
	
	// click handler for the document, filters to all links/maps/submit/image buttons
	this.navigation = function(event) {
//		try {
			var target = $(event.target).add($(event.target).parents()).filter("[@href], :submit, :image").filter(":first");
			// only beacon the above items, or if we were given a specific destination
			if (!target.length) { return; }
			var params = {
				type: "navigation",
				page: location.pathname,
				// an image source, button value, or link text
				item: $.trim($(event.target).attr("src") || target.val() || target.text()),
				// link href, or form action
				destination: target.attr("href") || target.parents("form").filter(":first").attr("action")
			};
			send(params);
//		} catch(e) {
//			console.log("analytics failed on target: " + event.target + "\n" + e);
//		} finally {
			event.stopPropagation(); // for debug only
			event.preventDefault();  // for debug only
//		}
	}
	
	// sends a beacon, returns when the request is sent (not returned) or after a short timeout
	var send = function(params) {
		$.extend(params, {
			time_on_page: ((new Date).getTime() - start_time) / 1000,
			random: Math.round(Math.random() * 100000000)
		});
		var timeout = (new Date()).getTime() + 500;
		var request = $.ajax({ data: params, url: beacon });
		while (true) {
			if (request.readyState >= 2) break;
			if ((new Date()).getTime() >= timeout) break;  
		}
	}
	
	// apply navigation tracking to the whole document: these are filtered on click
	$(document).click(this.navigation);
});
