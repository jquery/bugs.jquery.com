jQuery(window).unbind('unload').unload(function(){
	var elems = document.getElementsByTagName('*'),
		pos = elems.length + 1, // +1 for the document
		dummy = {};
	
	jQuery.data( dummy );
	for( var expando in dummy );
			
	while( pos-- ){
		var elem = elems[ pos ] || document, //add the document
			id = elem[expando];

		if( id && jQuery.cache[id] && jQuery.cache[id].events )
			jQuery.event.remove( elem );
	}
});