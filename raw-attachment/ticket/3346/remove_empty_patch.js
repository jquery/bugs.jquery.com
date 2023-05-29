jQuery.each({
	remove: function( selector, removeEvents ){
		if ( !selector || jQuery.filter( selector, [ this ] ).r.length ) {
			// if either arg === false, preserve events
			if ( selector!==false && removeEvents!==false ){ 
				// Prevent memory leaks
				jQuery( "*", this ).add( this ).each(function(){
					jQuery.event.remove( this );
					jQuery.removeData( this );
					});
				}
			if ( this.parentNode )
				this.parentNode.removeChild( this );
			}
		},
	empty: function( removeEvents ){
		// Remove element nodes and prevent memory leaks
		jQuery( ">*", this ).remove( removeEvents );

		// Remove any remaining nodes
		while ( this.firstChild )
			this.removeChild( this.firstChild );
		}	
	}, 
	function( name, fn ){
		jQuery.fn[ name ] = function(){ 
			return this.each( fn, arguments ); 
			};
		});