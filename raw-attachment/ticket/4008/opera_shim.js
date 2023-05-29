function int_prop(fx){ 
	var val = ( fx.unit == "px" && jQuery.browser.opera ) ? parseInt(fx.now) : fx.now;
	fx.elem.style[ fx.prop ] = val + fx.unit; 
} 
jQuery.extend( jQuery.fx.step, {
  borderTopWidth : int_prop,
  borderBottomWidth : int_prop,
  borderLeftWidth: int_prop,
  borderRightWidth: int_prop
  });
