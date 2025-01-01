class Element {
  constructor(tag, props, ...children) {
    this.tag = tag;
    this.props = props ?? {};
    this.children = children.flat();
  }
}

class Fragment {}

class Context {};

let booleanNames = {
  allowfullscreen: 0,
  async: 0,
  autofocus: 0,
  autoplay: 0,
  checked: 0,
  controls: 0,
  default: 0,
  defer: 0,
  disabled: 0,
  formnovalidate: 0,
  inert: 0,
  ismap: 0,
  itemscope: 0,
  loop: 0,
  multiple: 0,
  muted: 0,
  nomodule: 0,
  novalidate: 0,
  open: 0,
  playsinline: 0,
  readonly: 0,
  required: 0,
  reversed: 0,
  selected: 0,
  shadowrootclonable: 0,
  shadowrootdelegatesfocus: 0,
  shadowrootserializable: 0,
};

let voidTags = {
  area: 0,
  base: 0,
  br: 0,
  col: 0,
  embed: 0,
  hr: 0,
  img: 0,
  input: 0,
  link: 0,
  meta: 0,
  source: 0,
  track: 0,
  wbr: 0,
};

let createElement = (...args) => new Element(...args);

let replacement = (char) =>
  char === '"' ? "&quot;" : char === "&" ? "&amp;" : "&lt;";

let quote = (value) => {
  if (value === null || value === undefined || value === false) {
    return "";
  } else {
    return String(value).replace(/["&<]/g, replacement);
  }
};

let renderProps = (props) => {
  let html = "";
  for (let name in props) {
    let value = props[name];
    if (name in booleanNames) {
      html += " " + name;
    } else if (name !== "key" && name !== "html") {
      html += " " + name + '="';
      if (name === "class" && Array.isArray(value)) {
        for (let className of value) {
          if (className) {
            html += quote(className) + " ";
          }
        }
      } else if (name === "style" && typeof value === "object") {
        for (let property in value) {
          html += quote(property + ":" + value[property] + ";");
        }
      } else {
        html += quote(value);
      }
      html += '"';
    }
  }
  return html;
};

let renderChild = (context) => (child) =>
  child instanceof Element ? render(child, context) : quote(child);

let renderChildren = (children, context) =>
  children.map(renderChild(context)).join("");

let render = ({ tag, props, children }, context = {}) => {
  if (tag === Fragment) {
    return renderChildren(children, context);
  } else if (tag === Context) {
    return renderChildren(children, { ...context, ...props.value });
  } else if (typeof tag === "function") {
    return render(tag({ ...props, children }, context), context);
  } else {
    return (
      "<" +
      tag +
      renderProps(props) +
      ">" +
      (tag in voidTags
        ? ""
        : ("html" in props ? props.html : "") +
          renderChildren(children, context) +
          "</" +
          tag +
          ">")
    );
  }
};

let renderChildAsync = (context) => (child) =>
  child instanceof Element ? renderAsync(child, context) : quote(child);

let join = (array) => array.join("");

let renderChildrenAsync = (children, context) =>
  Promise.all(children.map(renderChildAsync(context))).then(join);

let renderAsync = async ({ tag, props, children }, context = {}) => {
  if (tag === Fragment) {
    return renderChildrenAsync(children, context);
  } else if (tag === Context) {
    return renderChildrenAsync(
      children,
      { ...context, ...props.value },
      context
    );
  } else if (typeof tag === "function") {
    return renderAsync(await tag({ ...props, children }, context), context);
  } else {
    return (
      "<" +
      tag +
      renderProps(props) +
      ">" +
      (tag in voidTags
        ? ""
        : ("html" in props ? props.html : "") +
          (await renderChildrenAsync(children, context)) +
          "</" +
          tag +
          ">")
    );
  }
};

export { Fragment, Context, createElement, render, renderAsync };
