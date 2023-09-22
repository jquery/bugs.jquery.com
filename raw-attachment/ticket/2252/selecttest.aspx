<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>Test</title>
		<script language="javascript" type="text/javascript" src="/CoreScripts/jquery-1.3.2.js?asm=0.8.3631.29977"></script>
<script language="javascript" type="text/javascript">
$.fn.val = function(value) {
	if ( value === undefined ) {
		var elem = this[0];

		if ( elem ) {
			if( jQuery.nodeName( elem, 'option' ) )
				return (elem.attributes.value || {}).specified ? elem.value : elem.text;
			
			// We need to handle select boxes special
			if ( jQuery.nodeName( elem, "select" ) ) {
				var index = elem.selectedIndex,
					values = [],
					options = elem.options,
					one = elem.type == "select-one";

				// Nothing was selected
				if ( index < 0 )
					return null;

				if (one && jQuery.browser.msie && parseFloat(jQuery.browser.version) < 7) {
					var opt = this.children().get(index);
					return (opt.attributes.value || {}).specified ? opt.value : opt.text;
				}
				else {
					// Loop through all the selected options
					for ( var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++ ) {
						var option = options[ i ];

						if ( option.selected ) {
							// Get the specifc value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if ( one )
								return value;

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;				
				}
			}

			// Everything else, we just grab the value
			return (elem.value || "").replace(/\r/g, "");

		}

		return undefined;
	}

	if ( typeof value === "number" )
		value += '';

	return this.each(function(){
		if ( this.nodeType != 1 )
			return;

		if ( jQuery.isArray(value) && /radio|checkbox/.test( this.type ) )
			this.checked = (jQuery.inArray(this.value, value) >= 0 ||
				jQuery.inArray(this.name, value) >= 0);

		else if ( jQuery.nodeName( this, "select" ) ) {
			var values = jQuery.makeArray(value);
			if (jQuery.browser.msie && parseFloat(jQuery.browser.version) < 7 && this.type == 'select-one') {
				var children = $(this).children();
				var idx = -1;
				children.each(function(i) {
					if (jQuery.inArray( this.value, values ) >= 0 || jQuery.inArray( this.text, values ) >= 0) {
						idx = i
						return false;
					}
				});
				this.selectedIndex = idx;
				var x = this;

				window.setTimeout(function() { x.selectedIndex = idx; }, 0);
			}
			else {
				jQuery( "option", this ).each(function(){
					this.selected = (jQuery.inArray( this.value, values ) >= 0 ||
						jQuery.inArray( this.text, values ) >= 0);
				});

				if ( !values.length )
					this.selectedIndex = -1;
			}
		} else
			this.value = value;
	});
}
$(function() {
	$('#sel').html('<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>');
	$('#sel').val('2');
	alert($('#sel').val());
});
</script>
	</head>
	<body>
		<select id="sel" style="width: 100px">
			
		</select>
	</body>
</html>