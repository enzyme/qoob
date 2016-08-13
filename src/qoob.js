(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('qoob', function() {
    class Qoob {
        //
        constructor(target) {
            if (target !== null && typeof target === 'object') {
                this.target = target;
            } else if (target !== null && typeof target === 'string') {
                this.target = document.querySelectorAll(target);
            } else {
                this.target = null;
            }

            return this;
        }

        //
        first() {
            return this._dispatch(
                (self => (new Qoob(self.target[0]))),
                (self => self),
                (_ => null)
            );
        }

        //
        on(event, closure) {
            return this._dispatch(
                function(self) {
                    return self._forEach(
                        self.target,
                        function(element, _) {
                            self._addEventListener(element, event, closure)
                        }
                    );
                }
                (self => this._addEventListener(self, event, closure)),
                (_ => null)
            );
        }

        //
        _dispatch(collection_closure, single_closure, null_closure) {
            if (this.target === null) {
                return null_closure(this);
            }

            if (typeof this.target === 'array') {
                return collection_closure(this);
            }

            return single_closure(this);
        }

        //
        _addEventListener(element, event_name, closure) {
            if (element.addEventListener) {
                element.addEventListener(event_name, closure);
            } else {
                element.attachEvent('on' + event_name, function() {
                    closure.call(element);
                });
            }
        }

        //
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
