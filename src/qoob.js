(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('qoob', function() {
    class Qoob {
        //
        constructor(target) {
            if (target !== null && typeof target === 'object') {
                console.log('got object');

                this.target = target;
            } else if (typeof target === 'string') {
                console.log('got string');

                this.target = document.querySelectorAll(target);
            } else {
                console.log('got null');

                this.target = null;
            }

            return this;
        }

        //
        first() {
            console.log('first');

            return this._dispatch(
                (instance => (new Qoob(instance.target[0]))),
                (instance => instance),
                (_ => null)
            );
        }

        //
        on(event, closure) {
            console.log('on');

            return this._dispatch(
                function(instance) {
                    return instance._forEach(
                        instance.target,
                        function(element, _) {
                            instance._addEventListener(element, event, closure)
                        }
                    );
                },
                (instance => this._addEventListener(instance, event, closure)),
                (_ => null)
            );
        }

        //
        _dispatch(collection_closure, single_closure, null_closure) {
            console.log('_dispatch...');

            if (this.target === null) {
                console.log('target is null.');

                return null_closure(this);
            }

            if (typeof this.target === 'array') {
                console.log('target is array.');

                return collection_closure(this);
            }

            console.log('target is single.');

            return single_closure(this);
        }

        //
        _addEventListener(element, event_name, closure) {
            console.log('_addEventListener...');
            console.log(element, event_name);

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
            console.log('_forEach...');

            for (var i = 0; i < array.length; i++) {
                console.log('Calling closure on ', array[i]);

                closure(array[i], i);
            }
        }
    }

    return function(target) {
        return new Qoob(target);
    }
}));
