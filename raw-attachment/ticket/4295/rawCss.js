Index: src/core.js
===================================================================
--- src/core.js	(revision 6270)
+++ src/core.js	(working copy)
@@ -629,6 +629,8 @@
 
 // exclude the following css properties to add px
 var	exclude = /z-?index|font-?weight|opacity|zoom|line-?height/i,
+	// combined trbl styles which have issues computing all at once
+	combined = /^(margin|padding|border-?(width|style|color))$/i;
 	// cache defaultView
 	defaultView = document.defaultView || {},
 	toString = Object.prototype.toString;
@@ -786,7 +788,7 @@
 	},
 
 	curCSS: function( elem, name, force ) {
-		var ret, style = elem.style;
+		var ret;
 
 		// We need to handle opacity special in IE
 		if ( name == "opacity" && !jQuery.support.opacity ) {
@@ -797,10 +799,30 @@
 				ret;
 		}
 
+		if ( name.match( combined ) ) {
+			var prefix = name;
+			var suffix = '';
+			if ( name.match( /^border/i ) ) {
+				// Special case, border*Edge not borderEdge*
+				prefix = 'border'
+				suffix = name.replace( /^border/, '' );
+			}
+
+			return jQuery.map(['Top', 'Right', 'Bottom', 'Left'], function(edge) {
+				return jQuery.rawCss( elem, prefix + edge + suffix, force );
+			}).join(' ');
+		}
+
 		// Make sure we're using the right name for getting the float value
 		if ( name.match( /float/i ) )
 			name = styleFloat;
+		
+		return jQuery.rawCss( elem, name, force );
+	},
 
+	rawCss: function( elem, name, force ) {
+		var style = elem.style;
+		
 		if ( !force && style && style[ name ] )
 			ret = style[ name ];
 
