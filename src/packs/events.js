import { each } from './utils.js'

/**
 * Fire a callback on any element(s) matching the selector when the
 * specified event type occurs.
 * @param {mixed} selector
 * @param {string} event
 * @param {function} closure
 */
export function on(selector, event, closure) {
    each(selector, (element, _) => {
        if (element.addEventListener) {
            element.addEventListener(event, closure)
        } else {
            element.attachEvent('on' + event, () => {
                closure.call(element)
            })
        }
    })
}

/**
 * Executes the given callback function with the document is ready.
 * @param {function} closure
 */
export function documentReady(closure) {
    if (document.readyState != 'loading'){
        closure()
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', closure)
    } else {
        document.attachEvent('onreadystatechange', () => {
            if (document.readyState != 'loading') {
                closure()
            }
        })
    }
}
