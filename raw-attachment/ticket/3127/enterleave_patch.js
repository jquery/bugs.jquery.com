if ( !jQuery.browser.msie ){
	jQuery.each({ 
		mouseover: 'mouseenter', 
		mouseout: 'mouseleave' 
		}, function( orig, fix ){
		jQuery.event.special[ fix ] = {
			setup: function(){
				jQuery.event.add( this, orig, withinElement, fix );
				},
			teardown: function(){
				jQuery.event.remove( this, orig, withinElement );
				}
			};			   
		});
	// Checks if an event happened on an element within another element
	// Used as jQuery.event.special.mouseenter and mouseleave handlers
	var withinElement = function( event ) {
		// set the correct event type
		event.type = event.data;
		// Check if mouse(over|out) are still within the same parent element
		var parent = event.relatedTarget;
		// Traverse up the tree
		while ( parent && parent != this ) 
			try { parent = parent.parentNode; } 
		catch ( err ) { parent = this; }
		// handle event if we actually just moused on to a non sub-element
		if ( parent != this) jQuery.event.handle.apply( this, arguments );
		};
	}