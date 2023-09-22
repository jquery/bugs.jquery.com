jQuery.each({
	slideDown: { height:"show" },
	slideUp: { height: "hide" },
	slideToggle: { height: "toggle" },
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	}, function( name, props ){
	jQuery.fn[ name ] = function(speed,callback){
		return this.animate( props, speed, callback );
		};			
	});