(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('qoob', function() {
    return {
        first(selector) {
            let elements = this.find(selector);

            if (elements.length > 0) {
                return elements[0];
            }

            return null;
        },

        find(selector) {
            if (selector === null) {
                return null;
            }

            if (selector.constructor === Array || true === this.isNodeList(selector)) {
                return selector;
            }

            if (typeof selector === 'object') {
                return [selector];
            }

            return document.querySelectorAll(selector);
        },

        isNodeList(object) {
            return (
                typeof object.length != 'undefined'
                && typeof object.item != 'undefined'
            );
        },

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

        fadeIn(selector) {
            this.each(selector, function(element, _) {
                var opacity = 0;
                var last = +new Date();

                element.style.opacity = 0;
                element.style.filter = '';

                var tick = function() {
                    opacity += (new Date() - last) / 400;
                    element.style.opacity = opacity;
                    element.style.filter = 'alpha(opacity=' + (100 * opacity) | 0 + ')';

                    last = +new Date();

                    if (opacity < 1) {
                        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
                    }
                };

                tick();
            });
        },

        fadeOut(selector) {
            this.each(selector, function(element, _) {
                var opacity = 1;
                var last = +new Date();

                element.style.opacity = 1;
                element.style.filter = '';

                var tick = function() {
                    opacity -= (new Date() - last) / 400;
                    element.style.opacity = opacity;
                    element.style.filter = 'alpha(opacity=' + (100 * opacity) | 0 + ')';

                    last = +new Date();

                    if (opacity > 0) {
                        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
                    }
                };

                tick();
            });
        },

        hide(selector) {
            this.each(selector, function(element, _) {
                element.style.display = 'none';
            });
        },

        show(selector) {
            this.each(selector, function(element, _) {
                element.style.display = '';
            });
        },

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
                return this._allOrFirstInArray(html);
            }
        },

        css(selector, properties = {}) {
            this.each(selector, function(element, _) {
                for(var property in properties) {
                    element.style[property] = properties[property];
                }
            });
        },

        addClass(selector, class_name) {
            this.each(selector, function(element, _) {
                if (element.classList) {
                    element.classList.add(class_name);
                } else {
                    element.className += ' ' + class_name;
                }
            });
        },

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
                return this._allOrFirstInArray(attr);
            }
        },

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
                return this._allOrFirstInArray(val);
            }
        },

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
                return this._allOrFirstInArray(text);
            }
        },

        each(selector, closure) {
            var elements = this.find(selector);

            for (var i = 0; i < elements.length; i++) {
                closure(elements[i], i);
            }
        },

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

        _allOrFirstInArray(list) {
            return list.length > 1
                ? list
                : list[0];
        },
    }
}));
