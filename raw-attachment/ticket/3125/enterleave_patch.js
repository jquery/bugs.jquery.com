jQuery.each({ mouseover: 'mouseenter', mouseout: 'mouseleave' }, function( orig, fix ){
	var ev = jQuery.event.special[ fix ] = {
		setup: function(){
			return jQuery.browser.msie ? false : jQuery( this ).bind( orig, ev.handler );
			},
		teardown: function(){
			return jQuery.browser.msie ? false : jQuery( this ).unbind( orig, ev.handler );
			},
		handler: function( event ){
			event.type = fix; 
			return withinElement( event, this ) || jQuery.event.handle.apply( this, arguments );
			}
		};			   
	});