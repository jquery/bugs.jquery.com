// Patch multiFilter to handle complex descendent selectors
jQuery.multiFilter = function( expr, elems, not ) {
	// return array of filtered elements
	return $.grep( elems, function( elem ){ 
		elem = jQuery( elem ).is( expr ); 
		return not ? !elem : elem;
		});
	};

// Patch "is" method to handle complex descendent selectors
$.fn.is = function( selector ) {
	// reject bad arguments immediately
	if ( typeof selector != "string" ) return false;
	// local refs
	var $this = this, $elems; 
	// handle multiple selectors...
	$.each( selector.split( isComma ), function( arr, query ){
		// start with all the elements
		$elems = $this;
		// loop through selector query in family pieces...
		while ( query.length && $elems.length && ( arr = isRegExp.exec( query ) ) ) {
			// remove descendent(2) and child(3) section of the query, not ancestor(1)
			query = query.replace( arr[0].substr( arr[1] ? arr[1].length : 0 ), "" );
			// filter collection for the terminal child(3) selector...
			$elems = $elems.setArray( $.filter( arr[3], $elems ).r );
			// traverse "up" as needed using the descendent(2) and ancestor(1)...
			if ( arr[2] ) $elems = $elems[ isLookup[ arr[2] ] ]( arr[1] );
			}
		// query remains and no regexp match == bad selector
		if ( !isEmpty.test( query ) && !arr ) $elems = [];
		// if some elements matched, then break $.each loop
		return ( $elems.length < 1 );	
		});
	// if any elements matched any selector, return true
	return !!( $elems && $elems.length > 0 );
	};
	
// "is" regular expression matches from the end of the selector
var isRegExp = (/(?:([^>+~\s]+)\s*([>+~\s])\s*)?([^>+~\s]+)\s*$/),
// "is" lookup pairs the descender with the correct method to ascend...
isLookup = { ' ':'parents', '>':'parent', '+':'prev', '~':'prevAll' },
isEmpty = (/^\s*$/), isComma = (/\s*,\s*/);