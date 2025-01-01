import { Fragment, Element } from "./jsx";

export const jsx: (
  tag: string,
  props: { children: any[]; [key: string]: any },
  key?: any
) => Element;

export { Fragment, jsx as jsxs, jsx as jsxDEV };
