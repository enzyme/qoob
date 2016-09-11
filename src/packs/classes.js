import { find } from './nodes.js';
import { each } from './utils.js';

/**
 * Add the given class to the element(s) matching the selector.
 * @param {mixed} selector
 * @param {string} class_name
 */
export function addClass(selector, class_name) {
    each(selector, (element, _) => {
        if (element.classList) {
            element.classList.add(class_name);
        } else {
            element.className += ' ' + class_name;
        }
    });
}

/**
 * Remove the given class from the element(s) matching the selector.
 * @param {mixed} selector
 * @param {string} class_name
 */
export function removeClass(selector, class_name) {
    each(selector, (element, _) => {
        if (element.classList) {
            element.classList.remove(class_name);
        } else {
            element.className = element
                .className
                .replace(
                    new RegExp(
                        '(^|\\b)' +
                        class_name.split(' ').join('|') +
                        '(\\b|$)', 'gi'
                    ),
                    ' '
                );
        }
    });
}

/**
 * Checks whether the given class exists on the element(s) matching the
 * selector. This will still return true if multiple elements are
 * matched and any one of them has the class applied.
 * @param  {mixed} selector
 * @param  {string} class_name
 * @return {Boolean}
 */
export function hasClass(selector, class_name) {
    let truth = false;

    each(selector, (element, _) => {
        if (element.classList) {
            truth = element.classList.contains(class_name) === true
                ? true
                : truth;
        } else {
            truth = (
                new RegExp('(^| )' + class_name + '( |$)', 'gi')
                    .test(element.className)
            ) === true
                ? true
                : truth;
        }
    });

    return truth;
}

/**
 * Whether the element(s) matching the selector have the
 * given class applied.
 * @param  {mixed} selector
 * @param  {string} class_name
 * @return {Boolean}
 */
export function is(selector, class_name) {
    let truth = false;
    let self = this;

    each(selector, (element, _) => {
        let matches_fn = (
            element.matches
            || element.matchesSelector
            || element.msMatchesSelector
            || element.mozMatchesSelector
            || element.webkitMatchesSelector
            || element.oMatchesSelector
        );

        if (matches_fn) {
            truth = matches_fn.call(element, class_name) ? true : truth;
        } else {
            let nodes = find(class_name);

            self.each(nodes, (node, _) => {
                if (node === element) {
                    truth = true;
                }
            });
        }
    });

    return truth;
}
