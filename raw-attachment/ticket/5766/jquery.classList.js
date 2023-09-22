jQuery.support.classList = !!div.classList;

jQuery.fn.extend({
	addClass: function( value ) {
		if ( jQuery.isFunction(value) ) {
			return this.each(function() {
				jQuery(this).addClass( value.call(this) );
			});
		}

		if ( value && typeof value === "string" ) {
			var classNames = (value || "").split( rspace );
			for ( var i = 0, l = this.length; i < l; i++ ) {
            var elem = this[i];
                if ( elem.nodeType === 1 ) {
                    if ( !elem.className ) {
                        elem.className = value;

                    } else {
                        var className = " " + elem.className + " ";
                        for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
                            if (jQuery.support.classList) {
                                elem.classList.add(classNames[c]);
                            }
                            else if ( className.indexOf( " " + classNames[c] + " " ) < 0 ) {
                                elem.className += " " + classNames[c];
                            }
                        }
                    }
                }
            }
		}

		return this;
	},

	removeClass: function( value ) {
		if ( jQuery.isFunction(value) ) {
			return this.each(function() {
				jQuery(this).removeClass( value.call(this) );
			});
		}

		if ( (value && typeof value === "string") || value === undefined ) {
			var classNames = (value || "").split(rspace);

			for ( var i = 0, l = this.length; i < l; i++ ) {
				var elem = this[i];
                if ( elem.nodeType === 1 && elem.className ) {
                    if ( value ) {
                        var className = (" " + elem.className + " ").replace(rclass, " ");
                        for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
                            if (jQuery.support.classList) {
                                elem.classList.remove(classNames[c]);
                            }
                            else {
                                className = className.replace(" " + classNames[c] + " ", " ");
                            }
                        }
                        if (!jQuery.support.classList)
                            elem.className = className.substring(1, className.length - 1);

                    } else {
                        elem.className = "";
                    }
                }
			}
		}

		return this;
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ";
		for ( var i = 0, l = this.length; i < l; i++ ) {
            if (jQuery.support.classList) {
                return this[i].classList.contains(selector);
            }
            else {
                if ( (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
                    return true;
                }
            }
		}

		return false;
	}
});
