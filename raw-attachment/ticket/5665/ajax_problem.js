var soapMessage = '<S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/"> \
    				<S:Header/> \
    					<S:Body> \
        				<ns2:sayHello xmlns:ns2="http://main/"/> \
    					</S:Body> \
				 	</S:Envelope>';

var wsURL = "http://localhost:8080/TestJavascript/HelloWorldService";

$.ajax({
        url: wsURL,
        type: "POST",
        dataType: "xml",
        data: soapMessage,
		contentType: "text/xml; charset=\"utf-8\"",
        complete: onComplete,       
});

function onComplete(xData, status) {
	alert(status);
}
