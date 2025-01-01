import { html, unsafe } from "../../index";

console.log(html`
  <p>Hello world!</p>
  ${`<p>This should be escaped</p>`}
  ${html`
    <p>This should NOT be escaped</p>
  `}
  ${unsafe(`<p>This should NOT be escaped too</p>`)}
`);
