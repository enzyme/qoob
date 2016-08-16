(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else window[name] = definition();
}('Qoob', function() {
    return {
        // Find and return the first element in the DOM matching the given
        // selector, otherwise return null.
        first(selector) {
            let elements = this.find(selector);

            if (elements.length > 0) {
                return elements[0];
            }

            return null;
        },

        // Find and return an array of all elements in the DOM matching the
        // given selector. If an array or NodeList is given, simply return
        // the argument. If a single object is given, return the object
        // in a single element array.
        find(selector) {
            if (selector === null) {
                return null;
            }

            if (selector.constructor === Array || true === this._isNodeList(selector)) {
                return selector;
            }

            if (typeof selector === 'object') {
                return [selector];
            }

            return document.querySelectorAll(selector);
        },

        // Fire a callback when the specified event is fired on the provided DOM
        // element(s). The callback will be provided with the event object.
        on(selector, event, closure) {
            this.each(selector, function(element, _) {
                if (element.addEventListener) {
                    element.addEventListener(event, closure);
                } else {
                    element.attachEvent('on' + event, function() {
                        closure.call(element);
                    });
                }
            });
        },

        // Hide the selected DOM element(s) - the same as setting display: none.
        hide(selector) {
            this.each(selector, function(element, _) {
                element.style.display = 'none';
            });
        },

        // Hide the selected DOM element(s) - the same as setting display: auto
        // , or whatever is provided as the prefered display type.
        show(selector, preferred_display = '') {
            this.each(selector, function(element, _) {
                element.style.display = preferred_display;
            });
        },

        // Gets or sets the HTML content on the selected DOM element(s).
        html(selector, content = null) {
            let html = [];

            this.each(selector, function(element, _) {
                if (content === null) {
                    html.unshift(element.innerHTML);
                } else {
                    element.innerHTML = content;
                }
            });

            if (content === null) {
                return html;
            }
        },

        // Sets the given CSS properties on the selected DOM element(s). The CSS
        // properties should be provided as an object, eg:
        // {
        //      color: 'green',
        //      fontSize: '18px',
        // }
        css(selector, properties = {}) {
            this.each(selector, function(element, _) {
                for(var property in properties) {
                    element.style[property] = properties[property];
                }
            });
        },

        // Adds the given class to the selected DOM element(s).
        addClass(selector, class_name) {
            this.each(selector, function(element, _) {
                if (element.classList) {
                    element.classList.add(class_name);
                } else {
                    element.className += ' ' + class_name;
                }
            });
        },

        // Removes the given class on the selected DOM element(s).
        removeClass(selector, class_name) {
            this.each(selector, function(element, _) {
                if (element.classList) {
                    element.classList.remove(class_name);
                } else {
                    element.className = element
                        .className
                        .replace(
                            new RegExp(
                                '(^|\\b)' +
                                class_name.split(' ').join('|') +
                                '(\\b|$)', 'gi'
                            ),
                            ' '
                        );
                }
            });
        },

        // Returns true if any of the selected DOM element(s) have the given
        // class attached to themselves.
        hasClass(selector, class_name) {
            let truth = false;

            this.each(selector, function(element, _) {
                if (element.classList) {
                    truth = element.classList.contains(class_name) === true
                        ? true
                        : truth;
                } else {
                    truth = (
                        new RegExp('(^| )' + class_name + '( |$)', 'gi')
                            .test(element.className)
                    ) === true
                        ? true
                        : truth;
                }
            });

            return truth;
        },

        // Returns all the children for the selected DOM element(s), or only
        // the children match the provided selector.
        children(selector, child_selector = null) {
            let children = [];
            let self = this;

            this.each(selector, function(element, _) {
                if (child_selector !== null) {
                    let child_elements = element.querySelectorAll(child_selector);

                    self.each(child_elements, function(child_element, _) {
                        children.unshift(child_element);
                    });
                } else {
                    self.each(element.children, function(child_element, _) {
                        // Skip comment nodes on IE8
                        if (child_element.nodeType != 8) {
                            children.unshift(child_element);
                        }
                    });
                }
            });

            return children;
        },

        // Get the direct parent(s) of the selected DOM element(s).
        parent(selector) {
            let parents = [];

            this.each(selector, function(element, _) {
                parents.unshift(element.parentNode);
            });

            return parents;
        },

        // Find parent/ancestor element(s) matching the ancestor_selector of
        // the selected DOM element(s).
        ancestor(selector, ancestor_selector) {
            let ancestors = this.find(ancestor_selector);
            let list = [];
            let self = this;

            let finder = function(parent, list) {
                let node = null;

                self.each(list, function(el, _) {
                    if (node === null && el === parent) {
                        node = el;
                    }
                });

                return node;
            };

            this.each(selector, function(element, _) {
                let cur_node = element.parentNode;

                while(cur_node !== null) {
                    let result = finder(cur_node, ancestors);

                    if (result !== null) {
                        list.unshift(result);
                        break;
                    }

                    cur_node = cur_node.parentNode;
                }
            });

            return this._uniques(list);
        },

        // Get the sibling(s) of the selected DOM element(s).
        siblings(selector) {
            let list = [];

            this.each(selector, function(element, _) {
                let siblings = Array.prototype.slice.call(
                    element.parentNode.children
                );

                this.each(siblings, function(sibling_element, _) {
                    if (element !== sibling_element) {
                        list.unshift(sibling_element);
                    }
                });
            });

            return list;
        },

        // Sets the attribute given on the selected DOM element(s), or simply
        // returns the current value(s) if no value provided.
        attr(selector, attribute, value = null) {
            let attr = [];

            this.each(selector, function(element, _) {
                if (value === null) {
                    attr.unshift(element.getAttribute(attribute));
                } else {
                    element.setAttribute(attribute, value);
                }
            });

            if (value === null) {
                return attr;
            }
        },

        // Sets the value given on the selected DOM element(s), or simply
        // returns the current value(s) if no value provided.
        val(selector, value = null) {
            let val = [];

            this.each(selector, function(element, _) {
                if (value === null) {
                    val.unshift(element.value);
                } else {
                    element.value = value;
                }
            });

            if (value === null) {
                return val;
            }
        },

        // Sets the text given on the selected DOM element(s), or simply
        // returns the current value(s) if no value provided.
        text(selector, value = null) {
            let text = [];

            this.each(selector, function(element, _) {
                if (value === null) {
                    text.unshift((element.textContent || element.innerText));
                } else {
                    if (element.textContent !== undefined) {
                        element.textContent = value;
                    } else {
                        element.innerText = value;
                    }
                }
            });

            if (value === null) {
                return text;
            }
        },

        // Iterates over the selected DOM element(s) and executes the callback
        // function provided for each element. The callback will be provided
        // with the current element and the index.
        each(selector, closure) {
            var elements = this.find(selector);

            for (var i = 0; i < elements.length; i++) {
                closure(elements[i], i);
            }
        },

        // Executes the given callback when the document is ready.
        documentReady(closure) {
            if (document.readyState != 'loading'){
                closure();
            } else if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', closure);
            } else {
                document.attachEvent('onreadystatechange', function() {
                    if (document.readyState != 'loading') {
                        closure();
                    }
                });
            }
        },

        // Return only the first value from the provided array, if the array
        // is empty, return null instead.
        single(list) {
            return list.length > 0
                ? list[0]
                : null;
        },

        prop(name) {
            return function(element) {
                return element[name];
            }
        },

        func(name) {
            return function(element) {
                return element[name]();
            }
        },

        // Checks if the given object is a NodeList.
        _isNodeList(object) {
            return (
                typeof object.length != 'undefined'
                && typeof object.item != 'undefined'
            );
        },

        _uniques(list) {
            return list.filter(function(value, index, self) {
                return self.indexOf(value) === index;
            });
        },
    }
}));
