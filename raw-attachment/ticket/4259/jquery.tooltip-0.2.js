(function($) {
	$.fn.tooltip = function(options) {
		var settings = $.extend({}, $.fn.tooltip.defaults, options);
		$.fn.tooltip.checkDIV(settings.id, settings.class);
		
		switch(settings.attribute) {
			case 'alt':
				settings.tip = $(this).attr('alt');
				break;
			case 'title':
				settings.tip = $(this).attr('title');
				break;
			case 'custom':
				if(!settings.tip)
					// tip must me set when attribute is set to custom
					throw Error('tooltip(): tip must me set when attribute is set to custom.');
				break;
		}
		
		return this.each(function() {
			var $this = $(this);
			var $div = $('#' + settings.id);
			var tip = settings.tip;
			
			$this.mouseover(function() {
				$div.css({'left': $this.position().left, 'top': $this.position().top})
					.html(tip)
					.show();
			}).mouseout(function() {
				$div.hide()
					.html('');
			})
		})
	};
	
	$.fn.tooltip.checkDIV = function(divId, divClass) {
		var $div = $('#' + divId);
		var $body = $('body');
	
		if($div.length > 0) {
			$div
				.hide()
				.addClass(divClass)
		} else {
			$('<div />')
				.hide()
				.attr('id', divId)
				.addClass(divClass)
				.appendTo($body);
		}
	}
	
	$.fn.tooltip.defaults = {
		id: 'tooltip',
		tip: null,
		class: 'tooltip',
		attribute: 'alt'
	}
})(jQuery);