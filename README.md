# @audinue/html

Tiny JSX runtime for [Bun](https://bun.sh) that renders JSX straight to HTML strings. No virtual DOM, no hydration, no dependencies.

## Setup

```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@audinue/html"
  }
}
```

## Usage

JSX elements are objects with a `toString()`, so they can be passed directly to `new Response()`, or turned into HTML with `String()` or a template literal.

```jsx
const Page = ({ title }) => (
  <html>
    <head><title>{title}</title></head>
    <body>
      <h1>{title}</h1>
      <input type="checkbox" checked />
    </body>
  </html>
)

Bun.serve({
  fetch: () => new Response(<Page title="Hello" />, {
    headers: { 'Content-Type': 'text/html' }
  })
})
```

Output:

```html
<!DOCTYPE html><html><head><title>Hello</title></head><body><h1>Hello</h1><input type="checkbox" checked></body></html>
```

## Behavior

- **Escaping**: text children and attribute values are escaped with `Bun.escapeHTML`.
- **Raw content**: children of `<script>` and `<style>` are not escaped.
- **`innerHTML`**: a string `innerHTML` prop is inserted unescaped and replaces `children`.
- **`<html>`**: automatically prefixed with `<!DOCTYPE html>`.
- **Void elements** (`br`, `img`, `input`, `meta`, ...): rendered without a closing tag or children.
- **Boolean attributes** (`checked`, `disabled`, `async`, ...): rendered as a bare name when truthy, omitted when falsy.
- **Skipped values**: `null`, `undefined`, `true`, and `false` render nothing, as children or attributes.
- **Attribute names** are emitted as-is, so write `class` and `for`, not `className` and `htmlFor`.
- **Components** are plain functions of `props`; `Fragment` (`<>...</>`) is supported.
- Arrays of children are flattened.

## Security

`innerHTML` and the contents of `<script>`/`<style>` are never escaped. Don't pass untrusted input there.

Event handler props (`onclick`, ...) are rendered as plain string attributes, not functions.
