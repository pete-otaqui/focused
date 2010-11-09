/* Copyright (c) 2009 BBC (http://www.bbc.co.uk/)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 */

/**
 * jQuery.focused
 * Copyright (c) 2009 BBC (http://www.bbc.co.uk/)
 * Licensed under the MIT license.
 * Date: 09/11/2010
 *
 * @projectDescription Global focus tracking. Using this plugin you can retrieve the currently focused DOM Element.
 * http://github.com/bbc-frameworks/focused
 * @author Pete Otaqui
 * @version 0.1.0
 *
 * @id jQuery.focused
 * @return {Element} Returns the currently focused DOM Element or null if focus is outside the window object.
 *
 * @example var elm = $.focused();
 *
 * Notes:
 *    - Based on Lars Gersman's work, http://plugins.jquery.com/project/focused, but updated now that jQuery 1.4 has ".live"
 *    - Uses a simplifed version of the ":focusable" selector from jQuery UI
 **/
;(jQuery.focused) || (function($) {
    var focusedEl = null;
    // simplified ":focusable" selector from jQuery UI
    if ( typeof $.expr[':'].focusable === 'undefined' ) {
        $.extend($.expr[':'], {
            focusable: function( element ) {
                var nodeName = element.nodeName.toLowerCase(),
                    tabIndex = $.attr( element, "tabindex" );
                return ( /input|select|textarea|button|object/.test( nodeName )
                    ? !element.disabled
                    : "a" == nodeName
                        ? element.href || !isNaN( tabIndex )
                        : !isNaN( tabIndex ));
            }
        });
    }
    
    $(':focusable')
        .live('focus', function(ev) {
            focusedEl = this;
        })
        .live('blur', function(ev) {
            focusedEl = null;
        });
    $.focused = function() {
        return focusedEl;
    };
})(jQuery);