export class Element {
  tag: string;
  props: Record<string, any>;
  children: any[];
}

export const Fragment: () => Element;

export const Context: (props: { value: Record<string, any> }) => Element;

export const createElement: (
  tag: string,
  props: Record<string, any>,
  children: any[]
) => Element;

export const render: (
  element: Element,
  context?: Record<string, any>
) => string;

export const renderAsync: (
  element: Element,
  context?: Record<string, any>
) => Promise<string>;
