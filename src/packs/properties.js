import { camelize, each } from './utils.js';

/**
 * Get or set the given attribute for the element(s) matching the selector.
 * @param  {mixed} selector
 * @param  {string} attribute
 * @param  {mixed} [value=null]
 * @return {mixed}
 */
export function attr(selector, attribute, value = null) {
    let attr = [];

    each(selector, (element, _) => {
        if (value === null) {
            attr.unshift(element.getAttribute(attribute));
        } else {
            element.setAttribute(attribute, value);
        }
    });

    if (value === null) {
        return attr;
    }
}

/**
 * Get or set the value for the element(s) matching the selector.
 * @param  {mixed} selector
 * @param  {mixed} [value=null]
 * @return {mixed}
 */
export function val(selector, value = null) {
    let val = [];

    each(selector, (element, _) => {
        if (value === null) {
            val.unshift(element.value);
        } else {
            element.value = value;
        }
    });

    if (value === null) {
        return val;
    }
}

/**
 * Gets or sets the data attributes on the element(s) matching the selector.
 * @param  {mixed} selector
 * @param  {String} name
 * @param  {String} [content=null]
 * @return {mixed}
 */
export function data(selector, name, content = null) {
    let data = [];
    let self = this;

    each(selector, (element, _) => {
        if (content === null) {
            if (element.dataset) {
                data.unshift(element.dataset[camelize(name)]);
            } else {
                data.unshift(element.getAttribute('data-' + name));
            }
        } else {
            if (element.dataset) {
                element.dataset[camelize(name)] = content;
            } else {
                element.setAttribute('data-' + name, content);
            }
        }
    });

    if (content === null) {
        return data;
    }
}

/**
 * Set the css on the element(s) matching the selector.
 * @param {mixed} selector
 * @param {Object} [properties={}]
 */
export function css(selector, properties = {}) {
    each(selector, (element, _) => {
        for(var property in properties) {
            element.style[property] = properties[property];
        }
    });
}
