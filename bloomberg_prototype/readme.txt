My solution is inspired by the React Virtual DOM.


In the React framework's Virtual DOM, instead of actually modifying the DOM, it has a virtual DOM that is modified, which then in return updates the actual DOM.


In this solution a similar concept happens: a virtual list (visibility hidden) is modified first instead of the displayed list, and when I need to update the displayed list, because the displayed list elements are positioned absolutely it is easy to animate.   The virtual list does not need to animate at all it is only used to allow the browser to calculate the positions for use (thanks to inline-block element).  


Therefore, I am using the browser to calculate position using inline-blocks, then those position values (offsetTop, offsetLeft) are fed to the animated elements.  Display inline-block elements do not animate well with regards to position, only elements with position absolute can animate with respect to position, and that quality interferes with the properties of being an inline-block.


This is actually a very easy challenge without animating.  The way this solution came to be is that I simply took my solution that satisfied all requirements, except for animating, and realized I could very easily take the positions calculated by the browser in this solution and feed them to elements positioned absolutely that had the animation property set.