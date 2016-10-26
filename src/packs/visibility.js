import { each } from './utils.js'

/**
 * Hide the element(s) matching the selector.
 * @param {mixed} selector
 */
export function hide(selector) {
    each(selector, (element, _) => {
        element.style.display = 'none'
    })
}

/**
 * Show the element(s) matching the selector.
 * @param {mixed} selector
 * @param {String} [preferred_display='block']
 */
export function show(selector, preferred_display = 'block') {
    each(selector, (element, _) => {
        element.style.display = preferred_display
    })
}

/**
 * Toggle the visibility of the element(s) matching the selector.
 * @param {mixed} selector
 * @param {String} [preferred_display='block']
 */
export function toggle(selector, preferred_display = 'block') {
    let self = this

    each(selector, (element, _) => {
        if ('none' === element.style.display) {
            show(element, preferred_display)
        } else {
            hide(element)
        }
    })
}
