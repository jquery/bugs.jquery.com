(function($) {
    var nativeFixFunction = $.event.fix;

    $.event.fix = function(event) {
        if ( event[$.expando] ) {
            return event;
        }
        
        var resultEvent = nativeFixFunction.call($.event, event),
            doc = document.documentElement,
            body = document.body;
        
        if (browser.mozilla && browser.version < 1.9) {
            resultEvent.clientX -= -body.offsetLeft;
            resultEvent.clientY -= -body.offsetTop;
        } else if (!(browser.opera && browser.version <= 9.27)){
            resultEvent.clientX -= (doc.clientLeft || body.clientLeft || 0);
            resultEvent.clientY -= (doc.clientTop || body.clientTop || 0);
        }
        return resultEvent;
    };
})(jQuery);