(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('qoob', function() {
    class Qoob {
        constructor(selector) {
            if (typeof selector === 'string') {
                return (this.selector = document.querySelectorAll(selector));
            }

            return (this.selector = selector);
        }

        first() {
            if (typeof this.selector === 'array') {
                return new Qoob(this.selector[0]);
            }

            return this;
        }

        on(event, closure) {
            if (typeof this.selector === 'array') {
                return this._forEach(this.selector, function(element, _) {
                    return this._addEventListener(element, event, closure);
                });
            }

            return this._addEventListener(this.selector, event, closure);
        }

        _addEventListener(element, event_name, closure) {
            if (element.addEventListener) {
                element.addEventListener(event_name, closure);
            } else {
                element.attachEvent('on' + event_name, function() {
                    closure.call(element);
                });
            }
        }

        _forEach(array, closure) {
            for (var i = 0; i < array.length; i++) {
                closure(array[i], i);
            }
        }
    }

    return function(target) {
        return new Qoob(target);
    }
}));
