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
@@ -797,58 +799,76 @@
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
+				return getStyle( prefix + edge + suffix );
+			}).join(' ');
+		}
+
 		// Make sure we're using the right name for getting the float value
 		if ( name.match( /float/i ) )
 			name = styleFloat;
 
-		if ( !force && style && style[ name ] )
-			ret = style[ name ];
+		function getStyle( name ) {
+			if ( !force && style && style[ name ] )
+				ret = style[ name ];
 
-		else if ( defaultView.getComputedStyle ) {
+			else if ( defaultView.getComputedStyle ) {
 
-			// Only "float" is needed here
-			if ( name.match( /float/i ) )
-				name = "float";
+				// Only "float" is needed here
+				if ( name.match( /float/i ) )
+					name = "float";
 
-			name = name.replace( /([A-Z])/g, "-$1" ).toLowerCase();
+				name = name.replace( /([A-Z])/g, "-$1" ).toLowerCase();
 
-			var computedStyle = defaultView.getComputedStyle( elem, null );
+				var computedStyle = defaultView.getComputedStyle( elem, null );
 
-			if ( computedStyle )
-				ret = computedStyle.getPropertyValue( name );
+				if ( computedStyle )
+					ret = computedStyle.getPropertyValue( name );
 
-			// We should always get a number back from opacity
-			if ( name == "opacity" && ret == "" )
-				ret = "1";
+				// We should always get a number back from opacity
+				if ( name == "opacity" && ret == "" )
+					ret = "1";
 
-		} else if ( elem.currentStyle ) {
-			var camelCase = name.replace(/\-(\w)/g, function(all, letter){
-				return letter.toUpperCase();
-			});
+			} else if ( elem.currentStyle ) {
+				var camelCase = name.replace(/\-(\w)/g, function(all, letter){
+					return letter.toUpperCase();
+				});
 
-			ret = elem.currentStyle[ name ] || elem.currentStyle[ camelCase ];
+				ret = elem.currentStyle[ name ] || elem.currentStyle[ camelCase ];
 
-			// From the awesome hack by Dean Edwards
-			// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
+				// From the awesome hack by Dean Edwards
+				// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
 
-			// If we're not dealing with a regular pixel number
-			// but a number that has a weird ending, we need to convert it to pixels
-			if ( !/^\d+(px)?$/i.test( ret ) && /^\d/.test( ret ) ) {
-				// Remember the original values
-				var left = style.left, rsLeft = elem.runtimeStyle.left;
+				// If we're not dealing with a regular pixel number
+				// but a number that has a weird ending, we need to convert it to pixels
+				if ( !/^\d+(px)?$/i.test( ret ) && /^\d/.test( ret ) ) {
+					// Remember the original values
+					var left = style.left, rsLeft = elem.runtimeStyle.left;
 
-				// Put in the new values to get a computed value out
-				elem.runtimeStyle.left = elem.currentStyle.left;
-				style.left = ret || 0;
-				ret = style.pixelLeft + "px";
+					// Put in the new values to get a computed value out
+					elem.runtimeStyle.left = elem.currentStyle.left;
+					style.left = ret || 0;
+					ret = style.pixelLeft + "px";
 
-				// Revert the changed values
-				style.left = left;
-				elem.runtimeStyle.left = rsLeft;
+					// Revert the changed values
+					style.left = left;
+					elem.runtimeStyle.left = rsLeft;
+				}
 			}
+
+			return ret;
 		}
 
-		return ret;
+		return getStyle( name );
 	},
 
 	clean: function( elems, context, fragment ) {
