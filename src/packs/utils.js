import { find } from './nodes.js';

/**
 * Whether the given object is a NodeList.
 * @param  {object} object
 * @return {Boolean}
 */
export function isNodeList(object) {
    return (
        typeof object.length != 'undefined'
        && typeof object.item != 'undefined'
    );
}

/**
 * Returns a new array with only unique values (duplicates removed).
 * @param  {array} list
 * @return {array}
 */
export function uniques(list) {
    return list.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
}

/**
 * Returns a camel cased string from a slug cased string.
 * @param  {string} str
 * @return {string}
 */
export function camelize(str) {
    return str.replace(/-([a-z])/g, (m, w) => {
        return w.toUpperCase();
    });
}

/**
 * Execute the given callback function for each element in the
 * list provided.
 * @param {mixed} selector
 * @param {function} closure Will be passed element and index arguments.
 */
export function each(selector, closure) {
    let elements = find(selector);

    if (null === elements) {
        return;
    }

    for (let i = 0; i < elements.length; i++) {
        closure(elements[i], i);
    }
}

/**
 * Returns the first value in the array provided, otherwise returns null
 * if the array is empty.
 * @param  {array} list
 * @return {mixed}
 */
export function strip(list) {
    if (null === list) {
        return null;
    }

    return list.length > 0
        ? list[0]
        : null;
}

/**
 * Returns a function that takes an object as an argument and returns
 * the given property value on it.
 * @param  {string} name The property name,
 * @return {function}
 */
export function prop(name) {
    return (element) => {
        return element[name];
    }
}

/**
 * Returns a function that takes an object as an argument and returns
 * the value returned by calling the provided function on it.
 * @param  {string} name The name of the function to call.
 * @return {function}
 */
export function func(name) {
    return (element) => {
        return element[name]();
    }
}

/**
 * Get the first element matching the given selector.
 * @param  {string} selector
 * @return {mixed}
 */
export function first(selector) {
    let elements = find(selector);

    if (elements.length > 0) {
        return elements[0];
    }

    return null;
}
