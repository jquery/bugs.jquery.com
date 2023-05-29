var attr = !jQuery.support.hrefNormalized && notxml && special
	? elem.getAttribute( name, 2 )
-        : elem.getAttribute( name );
+        : elem.getAttribute( name ) ? elem.getAttribute( name ) : elem[name];