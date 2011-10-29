# floatScroll
This is a jQuery plugin I made to generically fix elements on a page when a user would scroll past them. The elements stay fixed in the browser window until the user scrolls back to up to where the element was at which point the element sticks back to its original position.

## Usage
    $('.my-elements').floatScroll()

## Options
floatScroll() takes an optional hash of options. There are 3 options available:

1. positionTop: defauled to 0. Sets how far from the top of the browser window the elements should float.
2. placeholderClass: defauled to 'scrollPlaceholder'. The class of the placeholder element injected into the DOM so the page doesn't lose its fundamental layout.
3. zIndex: defaulted to 100000. Sets the CSS z-index of the elements when they are floated.

## Note
This is actually a very complicated piece of functionality to do generically. As such, there are a bunch of bugs and features to write yet that I will probably not get to. Feel free to contribute :)
