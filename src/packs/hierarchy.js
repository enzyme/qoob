import { find } from './nodes.js';
import { uniques, each } from './utils.js';

/**
 * Get an array of ancestors matching the ancestor_selector for the
 * element(s) matching the selector.
 * @param  {mixed} selector
 * @param  {string} ancestor_selector
 * @return {array}
 */
export function ancestor(selector, ancestor_selector) {
    let ancestors = find(ancestor_selector);
    let list = [];
    let self = this;

    let finder = function(parent, list) {
        let node = null;

        each(list, (element, _) => {
            if (node === null && element === parent) {
                node = element;
            }
        });

        return node;
    };

    each(selector, (element, _) => {
        let cur_node = element.parentNode;

        while(cur_node !== null) {
            let result = finder(cur_node, ancestors);

            if (result !== null) {
                list.unshift(result);
                break;
            }

            cur_node = cur_node.parentNode;
        }
    });

    return uniques(list);
}

/**
 * Get an array of parents for the element(s) matching the selector.
 * @param  {mixed} selector
 * @return {array}
 */
export function parent(selector) {
    let parents = [];

    each(selector, (element, _) => {
        parents.unshift(element.parentNode);
    });

    return parents;
}

/**
 * Get an array of children for the element(s) matching the selector.
 * @param  {mixed} selector
 * @param  {string} [child_selector=null]
 * @return {array}
 */
export function children(selector, child_selector = null) {
    let children = [];
    let self = this;

    each(selector, (element, _) => {
        if (child_selector !== null) {
            let child_elements = element.querySelectorAll(child_selector);

            each(child_elements, (child_element, _) => {
                children.unshift(child_element);
            });
        } else {
            each(element.children, (child_element, _) => {
                // Skip comment nodes on IE8
                if (child_element.nodeType != 8) {
                    children.unshift(child_element);
                }
            });
        }
    });

    return children;
}

/**
 * Get an array of siblings for the element(s) matching the selector.
 * @param  {mixed} selector
 * @return {array}
 */
export function siblings(selector) {
    let list = [];
    let self = this;

    each(selector, (element, _) => {
        let siblings = Array.prototype.slice.call(
            element.parentNode.children
        );

        each(siblings, (sibling_element, _) => {
            if (element !== sibling_element) {
                list.unshift(sibling_element);
            }
        });
    });

    return list;
}
