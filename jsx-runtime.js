import { escapeHTML } from 'bun'

const Tag = Symbol('Tag')

const voids = { area: 1, base: 1, br: 1, col: 1, embed: 1, hr: 1, img: 1, input: 1, link: 1, meta: 1, source: 1, track: 1, wbr: 1 }

const booleans = { allowfullscreen: 1, alpha: 1, async: 1, autofocus: 1, autoplay: 1, checked: 1, controls: 1, default: 1, defer: 1, disabled: 1, formnovalidate: 1, inert: 1, ismap: 1, itemscope: 1, loop: 1, multiple: 1, muted: 1, nomodule: 1, novalidate: 1, open: 1, playsinline: 1, readonly: 1, required: 1, reversed: 1, selected: 1, shadowrootclonable: 1, shadowrootcustomelementregistry: 1, shadowrootdelegatesfocus: 1, shadowrootserializable: 1 }

const stringify = (value, raw) =>
  value === undefined || value === null || value === true || value === false
    ? ''
    : Array.isArray(value)
      ? value.map(value => stringify(value, raw)).join('')
      : typeof value[Tag] === 'function'
        ? stringify(value[Tag](value.props), raw)
        : typeof value[Tag] === 'string'
          ? `${value[Tag] === 'html' ? '<!DOCTYPE html>' : ''}<${value[Tag]}${Object.entries(value.props).map(([key, value]) => key === 'children' || key === 'innerHTML' || value === null || value === undefined ? '' : !Object.hasOwn(booleans, key) ? ` ${key}="${escapeHTML(value)}"` : !value ? '' : ` ${key}`).join('')}>${Object.hasOwn(voids, value[Tag]) ? '' : `${value[Tag] === 'script' || value[Tag] === 'style' ? stringify(value.props.children, true) : typeof value.props.innerHTML === 'string' ? stringify(value.props.innerHTML, true) : stringify(value.props.children)}</${value[Tag]}>`}`
          : raw
            ? value
            : escapeHTML(value)

export const jsx = (tag, props) => ({ [Tag]: tag, props, toString() { return stringify(this) } })

export const jsxs = jsx

export const jsxDEV = jsx

export const Fragment = ({ children }) => children
