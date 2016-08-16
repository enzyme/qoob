(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else window[name] = definition();
}('Qoob', function() {
    return {
        /**
         * Get the first element matching the given selector.
         * @param  {string} selector
         * @return {mixed}
         */
        first(selector) {
            let elements = this.find(selector);

            if (elements.length > 0) {
                return elements[0];
            }

            return null;
        },

        /**
         * Find and return any element(s) matching the given selector. If the
         * selector is an array or NodeList, simply return it as is. If the
         * selector is a single object, return it as an array with 1 element.
         * @param  {mixed} selector
         * @return {mixed}
         */
        find(selector) {
            if (selector === null) {
                return null;
            }

            if (selector.constructor === Array
                || true === this._isNodeList(selector)) {
                return selector;
            }

            if (typeof selector === 'object') {
                return [selector];
            }

            return document.querySelectorAll(selector);
        },

        /**
         * Fire a callback on any element(s) matching the selector when the
         * specified event type occurs.
         * @param {mixed} selector
         * @param {string} event
         * @param {function} closure
         */
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

        /**
         * Hide the element(s) matching the selector.
         * @param {mixed} selector
         */
        hide(selector) {
            this.each(selector, function(element, _) {
                element.style.display = 'none';
            });
        },

        /**
         * Show the element(s) matching the selector.
         * @param {mixed} selector
         * @param {String} [preferred_display='']
         */
        show(selector, preferred_display = '') {
            this.each(selector, function(element, _) {
                element.style.display = preferred_display;
            });
        },

        /**
         * Gets or sets the html content on the element(s) matching the selector.
         * @param  {mixed} selector
         * @param  {mixed} [content=null]
         * @return {mixed}
         */
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

        /**
         * Set the css on the element(s) matching the selector.
         * @param {mixed} selector
         * @param {Object} [properties={}]
         */
        css(selector, properties = {}) {
            this.each(selector, function(element, _) {
                for(var property in properties) {
                    element.style[property] = properties[property];
                }
            });
        },

        /**
         * Add the given class to the element(s) matching the selector.
         * @param {mixed} selector
         * @param {string} class_name
         */
        addClass(selector, class_name) {
            this.each(selector, function(element, _) {
                if (element.classList) {
                    element.classList.add(class_name);
                } else {
                    element.className += ' ' + class_name;
                }
            });
        },

        /**
         * Remove the given class from the element(s) matching the selector.
         * @param {mixed} selector
         * @param {string} class_name
         */
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

        /**
         * Checks whether the given class exists on the element(s) matching the
         * selector. This will still return true if multiple elements are
         * matched and any one of them has the class applied.
         * @param  {mixed} selector
         * @param  {string} class_name
         * @return {Boolean}
         */
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

        /**
         * Whether the element(s) matching the selector have the
         * given class applied.
         * @param  {mixed} selector
         * @param  {string} class_name
         * @return {Boolean}
         */
        is(selector, class_name) {
            let truth = false;
            let self = this;

            this.each(selector, function(element, _) {
                let matches_fn = (
                    element.matches
                    || element.matchesSelector
                    || element.msMatchesSelector
                    || element.mozMatchesSelector
                    || element.webkitMatchesSelector
                    || element.oMatchesSelector
                );

                if (matches_fn) {
                    truth = matches_fn.call(element, class_name) ? true : truth;
                } else {
                    let nodes = this.find(class_name);

                    self.each(nodes, function(node, _) {
                        if (node === element) {
                            truth = true;
                        }
                    });
                }
            });

            return truth;
        },

        /**
         * Get an array of children for the element(s) matching the selector.
         * @param  {mixed} selector
         * @param  {string} [child_selector=null]
         * @return {array}
         */
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

        /**
         * Get an array of parents for the element(s) matching the selector.
         * @param  {mixed} selector
         * @return {array}
         */
        parent(selector) {
            let parents = [];

            this.each(selector, function(element, _) {
                parents.unshift(element.parentNode);
            });

            return parents;
        },

        /**
         * Get an array of ancestors matching the ancestor_selector for the
         * element(s) matching the selector.
         * @param  {mixed} selector
         * @param  {string} ancestor_selector
         * @return {array}
         */
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

        /**
         * Get an array of siblings for the element(s) matching the selector.
         * @param  {mixed} selector
         * @return {array}
         */
        siblings(selector) {
            let list = [];
            let self = this;

            this.each(selector, function(element, _) {
                let siblings = Array.prototype.slice.call(
                    element.parentNode.children
                );

                self.each(siblings, function(sibling_element, _) {
                    if (element !== sibling_element) {
                        list.unshift(sibling_element);
                    }
                });
            });

            return list;
        },

        /**
         * Get or set the given attribute for the element(s) matching the selector.
         * @param  {mixed} selector
         * @param  {string} attribute
         * @param  {mixed} [value=null]
         * @return {mixed}
         */
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

        /**
         * Get or set the value for the element(s) matching the selector.
         * @param  {mixed} selector
         * @param  {mixed} [value=null]
         * @return {mixed}
         */
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

        /**
         * Get or set the text for the element(s) matching the selector.
         * @param  {mixed} selector
         * @param  {mixed} [value=null]
         * @return {mixed}
         */
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

        /**
         * Execute the given callback function for each element in the
         * list provided.
         * @param {mixed} selector
         * @param {function} closure Will be passed element and index arguments.
         */
        each(selector, closure) {
            var elements = this.find(selector);

            for (var i = 0; i < elements.length; i++) {
                closure(elements[i], i);
            }
        },

        /**
         * Executes the given callback function with the document is ready.
         * @param {function} closure
         */
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

        /**
         * Returns the first value in the array provided, otherwise returns null
         * if the array is empty.
         * @param  {array} list
         * @return {mixed}
         */
        single(list) {
            return list.length > 0
                ? list[0]
                : null;
        },

        /**
         * Returns a function that takes an object as an argument and returns
         * the given property value on it.
         * @param  {string} name The property name,
         * @return {function}
         */
        prop(name) {
            return function(element) {
                return element[name];
            }
        },

        /**
         * Returns a function that takes an object as an argument and returns
         * the value returned by calling the provided function on it.
         * @param  {string} name The name of the function to call.
         * @return {function}
         */
        func(name) {
            return function(element) {
                return element[name]();
            }
        },

        /**
         * Whether the given object is a NodeList.
         * @param  {object} object
         * @return {Boolean}
         */
        _isNodeList(object) {
            return (
                typeof object.length != 'undefined'
                && typeof object.item != 'undefined'
            );
        },

        /**
         * Returns a new array with only unique values (duplicates removed).
         * @param  {array} list
         * @return {array}
         */
        _uniques(list) {
            return list.filter(function(value, index, self) {
                return self.indexOf(value) === index;
            });
        },
    }
}));
