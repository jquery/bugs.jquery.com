diff --git a/qunit/testrunner.js b/qunit/testrunner.js
index fd3abd5..094b2f1 100644
--- a/qunit/testrunner.js
+++ b/qunit/testrunner.js
@@ -3,7 +3,7 @@
  * 
  * http://docs.jquery.com/QUnit
  *
- * Copyright (c) 2008 John Resig, Jörn Zaefferer
+ * Copyright (c) 2008 John Resig, Jörn Zaefferer, Yoan Blanc
  * Dual licensed under the MIT (MIT-LICENSE.txt)
  * and GPL (GPL-LICENSE.txt) licenses.
  *
@@ -320,6 +320,22 @@ function runTest() {
 	});
 }
 
+function log(e, name, callback, type) {
+	if (typeof console != "undefined" && console.error && console.warn) {
+		console.error(type + " " + name + " died, exception and " + type + " follows");
+		console.error(e);
+		console.warn(callback.toString());
+	} else if (typeof opera != "undefined" && opera.postError) {
+	opera.postError(type + " " + name + " died, exception and " + type + " follows", e, callback.toString());
+	}
+
+	if(type.toLowerCase() == "test")
+		config.assertions.push( {
+			result: false,
+			message: "Died on test #" + (config.assertions.length + 1) + ": " + e.message
+		});
+}
+
 function test(name, callback) {
 	if(config.currentModule)
 		name = config.currentModule + " module: " + name;
@@ -330,35 +346,36 @@ function test(name, callback) {
 	
 	if ( !validTest(name) )
 		return;
-		
+	
 	synchronize(function() {
 		config.assertions = [];
 		config.expected = null;
+		
 		try {
 			lifecycle.setup();
+		} catch(e) {
+			log(e, name, lifecycle.setup, "setup");
+		}
+	});
+	synchronize(function() {
+		try {
 			callback();
+		} catch(e) {
+			log(e, name, callback, "test");
+		}
+	});
+	synchronize(function() {
+		try {
 			lifecycle.teardown();
 		} catch(e) {
-			if( typeof console != "undefined" && console.error && console.warn ) {
-				console.error("Test " + name + " died, exception and test follows");
-				console.error(e);
-				console.warn(callback.toString());
-			}
-			config.assertions.push( {
-				result: false,
-				message: "Died on test #" + (config.assertions.length + 1) + ": " + e.message
-			});
+			log(e, name, lifecycle.teardown, "teardown");
 		}
 	});
 	synchronize(function() {
 		try {
 			reset();
 		} catch(e) {
-			if( typeof console != "undefined" && console.error && console.warn ) {
-				console.error("reset() failed, following Test " + name + ", exception and reset fn follows");
-				console.error(e);
-				console.warn(reset.toString());
-			}
+			log(e, name, reset, "reset");
 		}
 		
 		if(config.expected && config.expected != config.assertions.length) {
