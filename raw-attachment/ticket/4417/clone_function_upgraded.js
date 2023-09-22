clone: function( events ) {
		// Do the clone
		var ret = this.map(function(){
			if ( !jQuery.support.noCloneEvent && !jQuery.isXMLDoc(this) ) {
				
				// IE copies events bound via attachEvent when
				// using cloneNode. Calling detachEvent on the
				// clone will also remove the events from the orignal
				
				// In order to get around this, we use innerHTML.
				// Unfortunately, this means some modifications to
				// attributes in IE that are actually only stored
				// as properties will not be copied (such as the
				// the name attribute on an input).
				var html = this.outerHTML;
				if ( !html ) {
					var div = this.ownerDocument.createElement("div");
					div.appendChild( this.cloneNode(true) );
					html = div.innerHTML;			
				}
				
				/////////////////////////////////////////////////
				/////////////////////////
				if(jQuery.browser.msie) {
					//Search all tags in outerHTML method
					jQuery.each(this.outerHTML.toString().match(/<[^<]*>/g),function(i,alltag){
						//Foreach tag find an attribute name id 
						var idtag=alltag.toString().match("id=[^ >]*");
						if(idtag) {
							//If id exists get the id value
							idtag=idtag.toString().split("=")[1];
							
							//Array Attributes who doens't change by javascripts methods like name in IE
							var attributes=['name'];
							
							//Foreach attribute declared above change to new values
							jQuery.each(attributes,function(j,attrs){
								//Find old value of the object
								var old_value=alltag.toString().match(attrs+"=[^ >]*");
								//Find new value of the object modified by any method
								var new_value=$("#"+idtag).attr(attrs);			
								//If diferent values replace with new value					
								if(old_value!=new_value) html=html.replace(old_value,attrs+"="+new_value);
							});
						}						
					});			
				}
				///////////////////////////////////////////////
				//////////////////////////////////////////////

				return jQuery.clean([html.replace(/ jQuery\d+="(?:\d+|null)"/g, "").replace(/^\s*/, "")])[0];
				
				
			} else
				return this.cloneNode(true);
			
		});

		// Copy the events from the original to the clone
		if ( events === true ) {
			var orig = this.find("*").andSelf(), i = 0;

			ret.find("*").andSelf().each(function(){
				if ( this.nodeName !== orig[i].nodeName )
					return;

				var events = jQuery.data( orig[i], "events" );

				for ( var type in events ) {
					for ( var handler in events[ type ] ) {
						jQuery.event.add( this, type, events[ type ][ handler ], events[ type ][ handler ].data );
					}
				}

				i++;
			});
		}
		
		// Return the cloned set
		return ret;
} 
