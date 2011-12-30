# floatScroll
This is a jQuery plugin I made to generically fix elements on a page when a user would scroll past them. The elements stay fixed in the browser window until the user scrolls back to up to where the element was at which point the element sticks back to its original position.

[View a demo here](http://glench.com/open-source/floatScroll/).

## Usage
    $('.my-elements').floatScroll(options)

## Options
floatScroll() takes an optional hash of options. There are 3 options available:

- *positionTop*: defaulted to 0. Sets how far from the top of the browser window the elements should float.
- *placeholderClass*: defaulted to 'scrollPlaceholder'. The class of the placeholder element injected into the DOM so the page doesn't lose its fundamental layout.
- *zIndex*: defaulted to 100000. Sets the CSS z-index of the elements when they are floated.

## Requirements
I have only tested this on jQuery 1.6.2. I'm assuming it will work on anything later than that, but I don't know about anything earlier.

I have tested using the built-in test cases on IE7, IE8, IE9, Firefox 7, and Chrome 14. This does not support IE6. If you find that any of the tests fail in a browser you think it should work in, please open up an issue on Github or better yet fix it yourself :)

## Note
This is actually a pretty complicated piece of functionality to do generically. As such, there are a bunch of bugs and features to write yet that I will probably not get to. Feel free to contribute :)
