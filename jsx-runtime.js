import { Fragment, createElement } from "./jsx";

let jsx = (tag, { children, ...attributes }, key) =>
  createElement(tag, { ...attributes, key }, children);

export { Fragment, jsx, jsx as jsxs, jsx as jsxDEV };
