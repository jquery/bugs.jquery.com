$.fn.contents = function(selector)
{
        var context = jQuery;

        var ret = jQuery.map( this, function(elem)
        {
                if(elem.contentWindow && elem.contentWindow.jQuery && context.nodeName(elem, "iframe"))
                {
                        context = elem.contentWindow.jQuery;
                        return elem.contentDocument || elem.contentWindow.document;
                }
                else if(context.nodeName(elem, "iframe"))
                        return elem.contentDocument || elem.contentWindow.document;

                return jQuery.makeArray(elem.childNodes);
        });

        if( selector && typeof selector == "string")
                ret = jQuery.multiFilter( selector, ret );

        if(context == jQuery)
                return this.pushStack( jQuery.unique( ret ) );

        return context(jQuery.map( this, function(elem) { return elem })).pushStack( context.unique( ret ) );
}
