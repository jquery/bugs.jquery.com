$(document).ready(function(){ 
    testXml();
});
 
 
function testXml()
{
	var theXml = "<test><item id='1'>one</item><item id='2'>two</item></test>";		
	
	// Uncomment the following line for IE workaround:
	// theXml = parseXml(theXml);
	
	$(theXml).find('item').each(function() 
	{
		var theItem = $(this);
		var theId = theItem.attr("id");
		var theText = theItem.text();		
		alert("Id=" + theId + " Text=" + theText);
	});
}

function parseXml(xml)
{	
	if (jQuery.browser.msie)
	{
		var xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); 
		xmlDoc.loadXML(xml);
		xml = xmlDoc;
	}
	
	return xml;
}
	 
	 
	 
	 