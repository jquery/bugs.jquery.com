  httpData: function( xhr, type, s ) {
    var ct  = xhr.getResponseHeader("content-type"),
      xml   = type === "xml"  || !type && ct && ct.indexOf("xml") >= 0,
      // Patch for #5709
      json  = type === "json" || !type && ct && ct.indexOf("json") >= 0,
      data  = xml ? xhr.responseXML : xhr.responseText;
    
    if ( xml && data.documentElement.nodeName === "parsererror" ) {
      throw "parsererror";
    }

    // Allow a pre-filtering function to sanitize the response
    // s is checked to keep backwards compatibility
    if ( s && s.dataFilter ) {
      data = s.dataFilter( data, type );
    }
    
    // The filter can actually parse the response
    if ( typeof data === "string" ) {

      // If the type is "script", eval it in global context
      if ( type === "script" ) {
        jQuery.globalEval( data );
      }

      // Get the JavaScript object, if JSON is used.
      if ( json || type === "json" ) {
        if ( typeof JSON === "object" && JSON.parse ) {
          data = JSON.parse( data );
        } else {
          data = (new Function("return " + data))();
        }
      }
    }

    return data;
  },