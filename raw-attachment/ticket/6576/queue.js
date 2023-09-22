jQuery.extend({
	delayTimeouts: {},
	
	queue: function( elem, type, data ) {
		if ( !elem ) {
			return;
		}

		type = (type || "fx") + "queue";
		var q = jQuery.data( elem, type );

		// Speed up dequeue by getting out quickly if this is just a lookup
		if ( !data ) {
			return q || [];
		}

		if ( !q || jQuery.isArray(data) ) {
			q = jQuery.data( elem, type, jQuery.makeArray(data) );

		} else {
			q.push( data );
		}

		return q;
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ), fn = queue.shift();

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
		}

		if ( fn ) {
			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift("inprogress");
			}

			fn.call(elem, function() {
				jQuery.dequeue(elem, type);
			});
		}
	}
});

jQuery.fn.extend({
	
	queue: function( type, data ) {
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
		}

		if ( data === undefined ) {
			return jQuery.queue( this[0], type );
		}
		return this.each(function( i, elem ) {
			var queue = jQuery.queue( this, type, data );

			if ( type === "fx" && queue[0] !== "inprogress" ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},

	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( ) {
		var id, time, type, parent;
	    if ( typeof arguments[0] !== 'string' ) {
			time = arguments[0];
			type = arguments[1];
		}
		else {
			id = arguments[0];
			time = arguments[1];
			type = arguments[2];
		}
		
		parent = this;
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";
		id = id || (type + jQuery.now() + Math.random() * 9999999 );

		if ( !jQuery.delayTimeouts[this.selector] ) {
			jQuery.delayTimeouts[this.selector] = {};
		}
		jQuery.delayTimeouts[this.selector][id] = true;

	    function setTimeoutFunc( elem, type, id ) {
	      	return setTimeout(function() {
				if (!jQuery.delayTimeouts[parent.selector]) return;
				if (!jQuery.delayTimeouts[parent.selector][id]) {
					delete jQuery.delayTimeouts[parent.selector][id];
					return;
				}
				jQuery.dequeue( elem, type );
				jQuery.removeData( elem, type + "timeout" + id );
				delete jQuery.delayTimeouts[parent.selector][id];
			}, time );
	    };

		return this.queue( type, function() {
			jQuery.data( this, type + "timeout" + id, setTimeoutFunc( this, type, id ) );
		});
	},

	removeDelay: function( id, type ) {
		var idTemp, numTimeouts = 0;
		type = type || "fx";
		
		if ( !jQuery.delayTimeouts[this.selector] ) return;

		for ( idTemp in jQuery.delayTimeouts[this.selector] ) {
			numTimeouts++;
		}
		
		id = id || idTemp;

		var q = jQuery.data( this[0], type + "timeout" + id );
		if ( q ) {
			clearTimeout( q );
			jQuery.removeData( this[0], type + "timeout" + id );
		}
			
		if ( jQuery.delayTimeouts[this.selector][id] ) {
			delete jQuery.delayTimeouts[this.selector][id];
		}

		if (numTimeouts == 1) {
			this.clearQueue( type );
		}

		return q;
	}, 

	clearQueue: function( type ) {
		var numTimeouts = 0;
		if ( jQuery.delayTimeouts[this.selector] ) {
			for ( var id in jQuery.delayTimeouts[this.selector] ) {
				numTimeouts++;
				this.removeDelay( id, type );
			}
			delete jQuery.delayTimeouts[this.selector];
		}
		if (!numTimeouts) {
			return this.queue( type || "fx", [] );
		}
	}
});
