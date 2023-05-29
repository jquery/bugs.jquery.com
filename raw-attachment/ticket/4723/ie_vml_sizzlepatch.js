
(function($) {

	var isJQuery13 = /1\.3/.test($.fn.jquery);
	
	if (isJQuery13 && $.browser.msie) {

		// IE VML elements throw an error error instead of returning "undefined"
		// if non-existing attributes are accessed.
		// So we need to avoid direct attribute access by using "attributes" property.

		// IE document.getElementsByTagName(*) has the annoying habit to return comment elements
		// that lack the existence of "attributes" attribute.
		// So we need to assure that it really exists.
		
		var Sizzle = $.find;

		var attr = function(elem, att_name) {
			return (elem.attributes ? elem.attributes[att_name] : elem[att_name]);
		};
		
		$.extend(Sizzle.selectors.filters, {
		
			enabled: function(elem){
				return false === attr(elem, "disabled") && "hidden" !== attr(elem, "type");
			},
			disabled: function(elem){
				return true === attr(elem, "disabled");
			},
			checked: function(elem){
				return true === attr(elem, "checked");
			},
			selected: function(elem){
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				elem.parentNode.selectedIndex;
				return true === attr(elem, "selected");
			},
			text: function(elem){
				return "text" === attr(elem, "type");
			},
			radio: function(elem){
				return "radio" === attr(elem, "type");
			},
			checkbox: function(elem){
				return "checkbox" === attr(elem, "type");
			},
			file: function(elem){
				return "file" === attr(elem, "type");
			},
			password: function(elem){
				return "password" === attr(elem, "type");
			},
			submit: function(elem){
				return "submit" === attr(elem, "type");
			},
			image: function(elem){
				return "image" === attr(elem, "type");
			},
			reset: function(elem){
				return "reset" === attr(elem, "type");
			},
			button: function(elem){
				return "button" === attr(elem, "type") || elem.nodeName.toUpperCase() === "BUTTON";
			}
			
		});
	}
})(jQuery);