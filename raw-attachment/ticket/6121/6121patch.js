//Patch for http://dev.jquery.com/ticket/6121
//3/24/2100: stephenp
//To apply:
//1. Replace the noData declaration with code below
//2. Change code that references noData to call the function and pass the element.  For example, jQuery.noData[elem.nodeName.toLowerCase()] should become jQuery.noData(elem)

        // The following elements throw uncatchable exceptions if you attempt to add expando properties to them.  You can override this to allow data support for something like Silverlight.  Flash support is already included.
        noDataElems: {
            "embed": true,
            "object": function(elem) {
                var clsid = elem.getAttribute("classid");
                //handles Flash elements added via object tag.  
                if (clsid && clsid === "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000") {
                    return false;
                }
                return true;
            },
            "applet": true
        },

        // Indicates whether an element is not safe to use with the data() function.
        noData: function(elem) {
            var isBanned = jQuery.noDataElems[elem.nodeName.toLowerCase()];
            if (!isBanned)
                return false;
            if (jQuery.isFunction(isBanned))
                return isBanned(elem);
            return true;
        },
