# Qoob (/kjuːb/)

A lightweight DOM manipulation library for common tasks.

## Examples

### CSS manipulation
```javascript
Qoob.css('p', {
    color: 'red',
    fontWeight: 'bold',
});
```

### Events
```javascript
Qoob.on('.Button', 'click', function(e) {
    alert('Button was clicked!');
});
```

### HTML manipulation
```javascript
Qoob.each('p', function(element, index) {
    Qoob.html(element, 'I am at index ' + index);
});
```

### All together now
```javascript
// When a `.Button` is clicked, all <p> tags with a child <span> will have
// that <span> hidden from the user.
Qoob.documentReady(function() {
    Qoob.on('.Button', 'click', function(e) {
        Qoob.each('p', function(element, _) {
            let spans = Qoob.children(element, 'span');

            Qoob.hide(spans);
        });
    });
});
```

## Install

### NPM
```bash
$ npm install --save qoob
```

### Bower
```bash
$ bower install qoob
```

### Direct link
```
https://cdn.rawgit.com/enzyme/qoob/master/dist/qoob.js
```

## Function reference

| Name | Parameters | Description |
| --- | --- | --- |
| addClass | selector, class_name | Add the given class to the element(s) matching the selector. |
| ancestor | selector, ancestor_selector | Get an array of ancestors matching the ancestor_selector for the element(s) matching the selector. |
| append | selector, child_element | Append the child element given to the element(s) matching the selector. |
| attr | selector, attribute, value = null | Get or set the given attribute for the element(s) matching the selector. |
| children | selector, child_selector = null | Get an array of children for the element(s) matching the selector. |
| css | selector, properties = {} | Set the css on the element(s) matching the selector. |
| documentReady | closure | Executes the given callback function with the document is ready. |
| each | selector, closure | Execute the given callback function for each element in the list provided. |
| find | selector | Find and return any element(s) matching the given selector. If the selector is an array or NodeList, simply return it as is. If the selector is a single object, return it as an array with 1 element. |
| first | selector | Get the first element matching the given selector.|
| func | name | Returns a function that takes an object as an argument and returns the value returned by calling the provided function on it. |
| hasClass | selector, class_name | Checks whether the given class exists on the element(s) matching the selector. This will still return true if multiple elements are matched and any one of them has the class applied. |
| hide | selector | Hide the element(s) matching the selector. |
| html | selector, content = null | Gets or sets the html content on the element(s) matching the selector. |
| is | selector, class_name | Whether the element(s) matching the selector have the given class applied. |
| on | selector, event, closure | Fire a callback on any element(s) matching the selector when the specified event type occurs. |
| parent | selector | Get an array of parents for the element(s) matching the selector. |
| prepend | selector, child_element | Prepend the child element given to the element(s) matching the selector. |
| prop | name | Returns a function that takes an object as an argument and returns the given property value on it. |
| remove | selector | Remove the element(s) from the DOM. |
| removeClass | selector, class_name | Remove the given class from the element(s) matching the selector. |
| show | selector, preferred_display = 'block' | Show the element(s) matching the selector. |
| siblings | selector | Get an array of siblings for the element(s) matching the selector. |
| single | list | Returns the first value in the array provided, otherwise returns null if the array is empty. |
| text | selector, value = null | Get or set the text for the element(s) matching the selector. |
| val | selector, value = null | Get or set the value for the element(s) matching the selector. |

## License

MIT, see LICENSE.

`Copyright (c) 2016 Tristan Strathearn <r3oath@gmail.com>`
