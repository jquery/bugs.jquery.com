//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// jQuery 1.3.1 ~ lines [ 744 - 767 ]
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
css: function( elem, name, force ) {
	// name == ( height or width )
	return jQuery.size.lookup[ name ] ? 
		// get elem height/width
		jQuery.size( elem, jQuery.size.lookup[ name ] ) : 		
		// get any other elem property
		jQuery.curCSS( elem, name, force ); 
},
size: function( $elems, Prop, arg ){
	
	// jquery collection or a single node ?
	var elem = $elems[0] || $elems, 
	// shorthand local variables
	docEl = document.documentElement, body = document.body;
	
	// NO ELEMENTS
	if ( !elem ) 
		return null; 
	
	// GET WINDOW SIZE
	if ( elem == window ) {
		// Use document.documentElement or document.body depending on Quirks vs Standards mode
		return document.compatMode == "CSS1Compat" && docEl[ "client" + Prop ] || body[ "client" + Prop ];		
	}
	
	// GET DOCUMENT SIZE
	if ( elem == document ){
		// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
		return Math.max( docEl[ "client" + Prop ],
			body[ "scroll" + Prop ], docEl[ "scroll" + Prop ],
			body[ "offset" + Prop ], docEl[ "offset" + Prop ]
		);
	}
	
	// GET SIZE OF A SINGLE ELEMENT
	if ( arg==undefined || arg=='padding' || arg=='border' || arg=='margin' ){ 
		// hold the calculated size value
		var val, 
		
		// get numeric attr value of the local elem
		getAttr = function( attr ){
			return parseFloat( jQuery.curCSS( elem, attr, true) ) || 0;
		},
		
		// calculate the size value
		getSize = function(){ 
			// size <-thru-> border
			val = elem[ 'offset' + Prop ]; 
			// +/- additional properties
			if ( arg != 'border' ){
				jQuery.each( Prop=='Width' ? ["Left","Right"] : ["Top","Bottom"], function(i,Dir){
					// plus margin
					if ( arg == 'margin' ) val += getAttr( arg+Dir ); 
					// minus borderWidth, arg == ( undefined or padding )
					else val -= getAttr( "border"+Dir+"Width" );
					// minus padding
					if ( arg == undefined ) val -= getAttr( "padding"+Dir );
				});
			}
		};
		
		// elem has layout, calculate value
		if ( jQuery.curCSS( elem, "display" )!='none' ) 
			getSize();
		
		// swap element layout, then calculate value
		else 
			jQuery.swap( elem, { position: "absolute", visibility: "hidden", display: "block" }, getSize ); 
		
		// adjust the size value
		return Math.max( 0, Math.round( val ) );
	}
	
	// SET SIZE ON JQUERY COLLECTION OF ELEMENTS
	// Set the width or height on each element (default to pixels if value is unitless)
	return $elems.css( Prop.toLowerCase(), typeof(arg)=="string" ? arg : arg + "px" ); 
},

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// jQuery 1.3.1 ~ lines [ 4195 - 4244 ]
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// height/width macro, also store obj for lookup in css fn
jQuery.size.lookup = jQuery.each({ 
	'height': 'Height', 
	'width': 'Width' 
	}, function( prop, Prop ){
	// height & width
	jQuery.fn[ prop ] = function( arg ){ 
		return jQuery.size( this, Prop, arg );
	};	
	// innerHeight & innerWidth
	jQuery.fn[ 'inner' + Prop ] = function(){
		return this[ prop ]( 'padding' );
	};
	// outerHeight & outerWidth
	jQuery.fn[ 'outer' + Prop ] = function( margin ){ 
		return this[ prop ]( margin ? 'margin' : 'border' );
	};
});