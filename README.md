# floatScroll
This is a jQuery plugin I made to generically fix elements on a page when a user would scroll past them. The elements stay fixed in the browser window until the user scrolls back to up to where the element was at which point the element sticks back to its original position.

[View a demo here](http://glench.com/open-source/floatScroll/).

Note that I'm **no longer maintaining this** and it would be wise to use the more popular [scrollToFixed](https://github.com/bigspotteddog/ScrollToFixed).

## Usage
    $('.my-elements').floatScroll(options)

## Options
floatScroll() takes an optional hash of options. The following options are available:

- **positionTop**: defaulted to 0. Sets how far from the top of the browser window the elements should float in pixels. e.g. *{positionTop: 55}*
- **placeholderClass**: defaulted to 'scrollPlaceholder'. The class of the placeholder element injected into the DOM so the page doesn't lose its fundamental layout.
- **onFloat**: a callback function called every time the element is floated. This function is passed the jQuery object being floated. e.g. *{onFloat: function($floated) { alert('poop'); }}*
- **onUnFloat**: a callback function called every time the element is unfloated. This function is passed the jQuery object being unfloated. e.g. *{onUnFloat: function($floated) { alert('double poop'); }}*
- **bounds**: a function that is called with the jQuery object to be floated and should return a jQuery object of the element that should bound the target floatScroll element. For example, if you only want an element to be floatscrolled within a `<div id="outer"></div>`, you would have this function return $('#outer'). e.g. *{bounds: function($floated) {return $('#outer'); }}*
- **zIndex**: defaulted to 100000. Sets the CSS z-index of the elements when they are floated. e.g. *{zIndex: 400}*

## Requirements

I have tested using the built-in test cases on IE7, IE8, IE9, Firefox, Safari, and Chrome. This does not support IE6. If you find that any of the tests fail in a browser you think it should work in, please open up an issue on Github or better yet fix it yourself :)

## Note
This is actually a pretty complicated piece of functionality to do generically. As such, there are a bunch of bugs and possible features that I will probably not get to. Feel free to contribute :)
