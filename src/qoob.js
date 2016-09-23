import { html, text } from './packs/content.js';
import { on, documentReady } from './packs/events.js';
import { hide, show, toggle } from './packs/visibility.js';
import { attr, val, data, css } from './packs/properties.js';
import { find, append, prepend, remove, make } from './packs/nodes.js';
import { ancestor, parent, children, siblings } from './packs/hierarchy.js';
import { isNodeList, uniques, camelize, each, strip, prop, func, first } from './packs/utils.js';
import { addClass, addClasses, removeClass, removeClasses, hasClass, is } from './packs/classes.js';

// These are all the functions that Qoob has to offer.
export default {
    addClass,
    addClasses,
    ancestor,
    append,
    attr,
    camelize,
    children,
    css,
    data,
    documentReady,
    each,
    find,
    first,
    func,
    hasClass,
    hide,
    html,
    is,
    isNodeList,
    make,
    on,
    parent,
    prepend,
    prop,
    remove,
    removeClass,
    removeClasses,
    show,
    siblings,
    strip,
    text,
    toggle,
    uniques,
    val,
}
