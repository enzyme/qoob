# Qoob (/kjuːb/)

A lightweight DOM manipulation library for common tasks.

## Example

```javascript
Qoob.documentReady(function() {
    // Collecting elements.
    let p_tags = Qoob.find('p');

    // Css manipulation.
    Qoob.css(p_tags, {
        color: 'red',
        fontWeight: 'bold',
    });

    // Event binding.
    Qoob.on('#clicker', 'click', function(e) {
        Qoob.html('#message', 'You clicked it!');
        Qoob.show('#message');
    });
});
```

## Install

Package manager
```bash
$ npm install qoob
```

CDN
```
https://cdn.rawgit.com/enzyme/qoob/master/dist/qoob.js
```

## Functions

| Name | Parameters | Description |
| --- | --- | --- |
| first | selector | Get the first element matching the given selector.|
| find | selector | Find and return any element(s) matching the given selector. If the selector is an array or NodeList, simply return it as is. If the selector is a single object, return it as an array with 1 element. |
| on | selector, event, closure | Fire a callback on any element(s) matching the selector when the specified event type occurs. |
| hide | selector | Hide the element(s) matching the selector. |
| show | selector, preferred_display = '' | Show the element(s) matching the selector. |
| html | selector, content = null | Gets or sets the html content on the element(s) matching the selector. |
| css | selector, properties = {} | Set the css on the element(s) matching the selector. |
| addClass | selector, class_name | Add the given class to the element(s) matching the selector. |
| removeClass | selector, class_name | Remove the given class from the element(s) matching the selector. |
| hasClass | selector, class_name | Checks whether the given class exists on the element(s) matching the selector. This will still return true if multiple elements are matched and any one of them has the class applied. |
| is | selector, class_name | Whether the element(s) matching the selector have the given class applied. |
| append | selector, child_element | Append the child element given to the element(s) matching the selector. |
| prepend | selector, child_element | Prepend the child element given to the element(s) matching the selector. |
| remove | selector | Remove the element(s) from the DOM. |
| children | selector, child_selector = null | Get an array of children for the element(s) matching the selector. |
| parent | selector | Get an array of parents for the element(s) matching the selector. |
| ancestor | selector, ancestor_selector | Get an array of ancestors matching the ancestor_selector for the element(s) matching the selector. |
| siblings | selector | Get an array of siblings for the element(s) matching the selector. |
| attr | selector, attribute, value = null | Get or set the given attribute for the element(s) matching the selector. |
| val | selector, value = null | Get or set the value for the element(s) matching the selector. |
| text | selector, value = null | Get or set the text for the element(s) matching the selector. |
| each | selector, closure | Execute the given callback function for each element in the list provided. |
| documentReady | closure | Executes the given callback function with the document is ready. |
| single | list | Returns the first value in the array provided, otherwise returns null if the array is empty. |
| prop | name | Returns a function that takes an object as an argument and returns the given property value on it. |
| func | name | Returns a function that takes an object as an argument and returns the value returned by calling the provided function on it. |

## License

MIT License

`Copyright (c) 2016 Tristan Strathearn <r3oath@gmail.com>`
