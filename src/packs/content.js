import { each } from './utils.js'

/**
 * Gets or sets the html content on the element(s) matching the selector.
 * @param  {mixed} selector
 * @param  {mixed} [content=null]
 * @return {mixed}
 */
export function html(selector, content = null) {
    let html = []

    each(selector, (element, _) => {
        if (content === null) {
            html.push(element.innerHTML)
        } else {
            element.innerHTML = content
        }
    })

    if (content === null) {
        return html
    }
}

/**
 * Get or set the text for the element(s) matching the selector.
 * @param  {mixed} selector
 * @param  {mixed} [value=null]
 * @return {mixed}
 */
export function text(selector, value = null) {
    let text = []

    each(selector, (element, _) => {
        if (value === null) {
            text.push((element.textContent || element.innerText))
        } else {
            if (element.textContent !== undefined) {
                element.textContent = value
            } else {
                element.innerText = value
            }
        }
    })

    if (value === null) {
        return text
    }
}
