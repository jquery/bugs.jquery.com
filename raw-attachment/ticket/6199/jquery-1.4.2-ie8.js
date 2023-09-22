/**
 * IE8 sets an offsetWidth and offsetHeight on elements even if they are
 * display: none, but only if there is a visible element before the one
 * you are checking.
 *
 * The "bug" in jQuery (not really jQuery's fault) is reported here:
 * http://dev.jquery.com/ticket/6199
 *
 * Solutions:
 *   Wrap everything in another element if you want to check if it is visible
 *   You can tweak the previous element to make it work (css or text)
 *   You can add an empty comment before the element
 *
 * This plugin uses the last option.
 */
(function () {
    if (! jQuery.browser.msie || Math.floor(jQuery.browser.version) != 8) {
        return;
    }
    var oldHidden = jQuery.expr.filters.hidden;
    jQuery.expr.filters.hidden = function(elem) {
        if (elem.previousSibling && elem.previousSibling.nodeType != 8) {
            $(elem).before('<!-- -->');
        }
        return oldHidden(elem);
    }
})();
