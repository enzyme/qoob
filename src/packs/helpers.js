import { each, head } from './utils'
import { data } from './properties.js'

/**
* Remove the attribute from the element(s) matching the selector.
* @param {mixed} selector
* @param {string} attribute
*/
export function toggler(selector, fn_on, fn_off) {
  each(selector, (element, _) => {
    const data_val = head(data(element, 'toggler-state'))
    const state = data_val || 'off'

    if (state === 'off') {
      if (fn_on(element) !== true) {
        data(element, 'toggler-state', 'on')
      }
    } else {
      if (fn_off(element) !== true) {
        data(element, 'toggler-state', 'off')
      }
    }
  })
}
