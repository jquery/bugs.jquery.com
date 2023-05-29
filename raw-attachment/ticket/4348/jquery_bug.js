var win = $("iframe#cible")[0];
var contDoc = win.contentDocument;
if (contDoc==undefined){
	contDoc = win.contentWindow.document;
}
var doc = $(contDoc);
var styleStr = "<style type=\"text/css\">.clazz{border: none;}</style>";
$(styleStr).appendTo($('head',doc));
