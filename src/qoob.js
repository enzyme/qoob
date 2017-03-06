import { toggler } from './packs/helpers.js';
import { html, text } from './packs/content.js'
import { on, documentReady } from './packs/events.js'
import { hide, show, toggle } from './packs/visibility.js'
import { ancestor, parent, children, siblings } from './packs/hierarchy.js'
import { find, append, prepend, remove, make, clone } from './packs/nodes.js'
import { attr, removeAttr, state, val, data, css } from './packs/properties.js'
import { addClass, addClasses, removeClass, removeClasses, hasClass, is } from './packs/classes.js'
import { isNodeList, uniques, camelize, each, strip, head, prop, func, first, firstOf } from './packs/utils.js'

// These are all the functions that Qoob has to offer.
export default {
  addClass,
  addClasses,
  ancestor,
  append,
  attr,
  camelize,
  children,
  clone,
  css,
  data,
  documentReady,
  each,
  find,
  first,
  firstOf,
  func,
  hasClass,
  head,
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
  removeAttr,
  removeClass,
  removeClasses,
  show,
  siblings,
  state,
  strip,
  text,
  toggle,
  toggler,
  uniques,
  val,
}
