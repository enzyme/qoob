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
            if (this.target !== null && this.target.length > 0) {
                return new Qoob(this.target[0]);
            }

            return null;
        }
    }

    return function(target) {
        return new Qoob(target);
    }
}));
