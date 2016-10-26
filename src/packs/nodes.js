import { html } from './content.js'
import { isNodeList, each } from './utils.js'

/**
 * Find and return any element(s) matching the given selector. If the
 * selector is an array or NodeList, simply return it as is. If the
 * selector is a single object, return it as an array with 1 element.
 * @param  {mixed} selector
 * @return {mixed}
 */
export function find(selector) {
    if (selector === null) {
        return null
    }

    if (selector.constructor === Array
        || true === isNodeList(selector)) {
        return selector
    }

    if (typeof selector === 'object') {
        return [selector]
    }

    return document.querySelectorAll(selector)
}

/**
 * Append the child element given to the element(s)
 * matching the selector.
 * @param {mixed} selector
 * @param {object} child_element
 */
export function append(selector, child_element) {
    each(selector, (element, _) => {
        element.appendChild(child_element)
    })
}

/**
 * Prepend the child element given to the element(s)
 * matching the selector.
 * @param {mixed} selector
 * @param {object} child_element
 */
export function prepend(selector, child_element) {
    each(selector, (element, _) => {
        element.insertBefore(child_element, element.firstChild)
    })
}

/**
 * Remove the element(s) from the DOM.
 * @param {mixed} selector
 */
export function remove(selector) {
    each(selector, (element, _) => {
        element.parentNode.removeChild(element)
    })
}

/**
 * Create a new html element of the specified type and optionally
 * fill it with the given html.
 * @param  {string} type
 * @param  {string} [inner_html=null]
 * @return {element}
 */
export function make(type, inner_html = null) {
    let element = document.createElement(type)

    if (null !== inner_html) {
        html(element, inner_html)
    }

    return element
}
