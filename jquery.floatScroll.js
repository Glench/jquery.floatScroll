/*
 * Make the element float at the top of the browser when
 * it would normally scroll off the top of the window.
 */
(function( $ ) {
$.floatScroll = {
    defaults: {
        positionTop: 0, // position at the top of the browser
        placeholderClass: 'scrollPlaceholder', // class you want to put on
                                               // the replacement element
        zIndex: 100000,
        onFloat: function($el){},
        onUnFloat: function($el){},
        bounds: function($el){
            return $([]);
        }
    }
}
$.fn.floatScroll = function(map){
    var opts = $.extend({},
        $.floatScroll.defaults,
        map || {}
    );

    var smart_left_offset = function($el, old_offset) {
        // Figure out which left we should use. If this thing is absolutely or
        // relatively positioned then we probably don't want to use its 'left'
        // property or else it could be positioned relative to a parent.

        // We also don't want to use offset all the time because it seems to
        // break with negative padding and things of that nature
        var offset;
        if ($el.css('position') == 'absolute') {
            offset = old_offset.left;
        } else if ($el.css('left') == 'auto') {
            offset = old_offset.left;
        } else if (!parseInt($el.css('left'))) {
            // when left isn't set, it returns '0px', which would be bad
            offset = old_offset.left;
        } else {
            offset = $el.css('left');
        }
        return offset;
    };

    return this.each(function() {
        var $this = $(this);
        var $window = $(window);
        var old_css = {
            position: $this.css('position'),
            top: $this.css('top'),
            right: $this.css('right'),
            left: $this.css('left'),
            width: $this.css('width'),
            zIndex: $this.css('z-index'),
            marginTop: $this.css('margin-top'),
            marginLeft: $this.css('margin-left'),
            'float': $this.css('float')
        }
        var old_offset = $this.offset();
        var floated_left = 0;
        var $bounds = opts.bounds($this);
        // On scroll, figure out what this element's positioning should be.
        $window.scroll(function() {
            var scrollTop = $window.scrollTop();
            var bottomBound = $bounds && $bounds.length && $bounds.outerHeight() + $bounds.offset().top + opts.positionTop - $this.outerHeight();
            console.log(bottomBound , scrollTop)
            if (old_offset.top - opts.positionTop > scrollTop) {
                // Remove old placeholder(s) and put this thing back into
                // position.
                if ($this.data(opts.placeholderClass)) {
                    $this.data(opts.placeholderClass).remove();
                    $this.data(opts.placeholderClass, null);
                }
                $this.css(old_css);
                opts.onUnFloat($this);
            } else if (bottomBound && bottomBound < scrollTop){
                $this.css('top', bottomBound - scrollTop);

            } else if (bottomBound && $this.data(opts.placeholderClass) && bottomBound > scrollTop){
                $this.css('top', opts.positionTop);
            } else if (!$this.data(opts.placeholderClass)) {
                // float this thing
                // Insert an element that is the same width and height as
                // the element that was there so on content the rest of the
                // page content doesn't jump.
                // do I have to take into account position here?
                var $placeholder = $('<div>', {
                    'class': opts.placeholderClass,
                    width: $this.outerWidth(true),
                    height: $this.outerHeight(true),
                    'css': {
                        'float': old_css['float'], // float is a reserved word
                        position: old_css['position'], // if the original element has special positioning
                        'top': old_css['top'],
                        right: old_css.right,
                        left: old_css.left
                    }
                });
                $this.after($placeholder);
                $this.data(opts.placeholderClass, $placeholder);

                // Apply new fixed css plus keep the correct style.
                // Don't want to apply css on every scroll event or else
                // IE does weird stuff with floated elements inside the thing
                // you're trying to floatScroll.
                floated_left = smart_left_offset($this, old_offset);
                $this.css({
                    position: 'fixed',
                    top: opts.positionTop,
                    left: floated_left,
                    width: $this.css('width'),
                    marginTop: 0,
                    marginLeft: 0,
                    zIndex: opts.zIndex
                });
                opts.onFloat($this);
            }
            if($this.data(opts.placeholderClass)){
                $this.css('left', floated_left - $window.scrollLeft());
            }
        });
    });

    // TODO: take into account when element is wider than window.
    // should resize when if its width was 100% of window or display:block
    // TODO: if there is a horizontal scroll bar, don't change anything
    // or possibly put the thing back in its position
    // TODO: take into account if this element is too big to floatScroll given
    // the vertical screen real estate. This should be an option.
    // TODO: add ability to not floatScroll if the page is too short
};
})( jQuery );
