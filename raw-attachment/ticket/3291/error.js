$(function() {
	var getcontent = function(handler, section, id, sort) {
		var json = null;
		
		var id_arr = (id.constructor.toString().indexOf("Array")>-1);
		var id_str = "";
		if(id_arr) {
			for(var idi = 0; idi < id.length; idi++) {
				id_str += "&id[]=" + id[idi];
			}
		} else {
			id_str += "&id=" + id;
		}
		
		var uri = 'json.php?s=' + section + id_str + '&sort=' + sort;
		
		/** Here is the error thrown **/
		json = $.ajax({
			url: uri,
			async: false
			}).responseText;
		eval(handler + '(' + json + ');');
	}
	window.getcontent = getcontent;
	
	$(document).ready(function() {
		try {
			window.getcontent('handleFotoBoek','fotoboek',-1,'id');
		} catch (e) { alert(e.message.toString()); }
	});
});
function handleFotoBoek(data) {
	if(checkdata(data)) {
		// Cleaning up the carousel
		/** Never Arrives here **/
	}
};