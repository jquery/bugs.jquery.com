///////////////////
// XML prototyping

// These should be ported into jQuery in some way...

function createXML (rName) {
   if (document.implementation && document.implementation.createDocument) {
      // Gecko-based browsers: Firefox, Safari, Opera, etc.
      xmlDoc = document.implementation.createDocument("",rName,null);
      xmlDoc.async = 'false';
      return xmlDoc;
   }
   else if (window.ActiveXObject) {
      // Internet Explorer
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = "false";
      var root = xmlDoc.createElement(rName);
      xmlDoc.documentElement = root;
      return xmlDoc;
   }
   else {
      alert("Browser incompatibility: createXML");
   }
   return undefined;
}

function parseXML (xmlStr) {
   if (window.DOMParser) {
      // Gecko-based browsers: Firefox, Safari, Opera, etc.
      xmlDoc = (new DOMParser()).parseFromString(xmlStr, "text/xml");
      return xmlDoc;
   }
   else if (window.ActiveXObject) {
      // Internet Explorer
      xmlDoc = document.createXML();
      xmlDoc.loadXML(xmlStr);
      return xmlDoc;
   }
   else {
      alert("Browser incompatibility: parseXML");
   }
   return undefined;
}

function serializeXML (xmlDoc) {
   if (window.XMLSerializer) {
      // Gecko-based browsers: Firefox, Safari, Opera, etc.
      try {  // might get tripped up on ?xml tags
         return XML((new XMLSerializer()).serializeToString(xmlDoc)).toXMLString();
      }
      catch (e) {
         return (new XMLSerializer()).serializeToString(xmlDoc);
      }
   }
   else if (xmlDoc.xml) {
      // Internet Explorer
      try {  // in case the ActiveX Objects don't exist
         var reader = new ActiveXObject("Msxml2.SAXXMLReader.4.0");
         var writer = new ActiveXObject("Msxml2.MXXMLWriter.4.0");
         writer.indent = true;
         writer.standalone = true;
         reader.contentHandler = writer;
         reader.putProperty("http://xml.org/sax/properties/lexical-handler", writer);
         reader.parse(xmlDoc);
         return writer.output;
      }
      catch (e) {
         return xmlDoc.xml.replace(/>(?=<\/?\w+)/g, ">\n");
      }
   }
   else {
      alert("Browser incompatibility: serializeXML");
   }
   return undefined;
}

// Quick fix for creating nodes
// (there should be a way of being able to do this without the
// 2nd parameter, the XML main element)

jQuery.cXML = function (n, x) { return jQuery(x.createElement(n)); }
