jQuery.fn.closest = function( selector, until ) {
	var pos = jQuery.expr.match.POS.test( selector ) ? jQuery(selector) : null,
		closer = 0;

	return this.map(function(){
		var cur = this;
		while ( cur && cur.ownerDocument ) {
			if ( until && until == cur ) return;
			if ( pos ? pos.index(cur) > -1 : jQuery(cur).is(selector) ) {
				jQuery.data(cur, "closest", closer);
				return cur;
			}
			cur = cur.parentNode;
			closer++;
		}
	});
};