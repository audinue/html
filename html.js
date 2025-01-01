class Chunk extends String {}

class Html extends Chunk {}

class Unsafe extends Chunk {}

const replacement = (char) =>
  char === "'"
    ? "&apos;"
    : char === '"'
    ? "&quot;"
    : char === "&"
    ? "&amp;"
    : "&lt;";

const quote = (value) => {
  if (value === null || value === undefined || value === false) {
    return "";
  } else if (value instanceof Chunk) {
    return value;
  } else if (Array.isArray(value)) {
    return value.map(quote).join("");
  } else {
    return String(value).replace(/['"&<]/g, replacement);
  }
};

const html = (raw, ...values) =>
  new Html(String.raw({ raw }, ...values.map(quote)));

const unsafe = (value) => new Unsafe(value);

export { html, unsafe };
