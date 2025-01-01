export class Chunk extends String {}

export class Html extends Chunk {}

export class Unsafe extends Chunk {}

export const html: (raw: TemplateStringsArray, ...values: any[]) => Html;

export const unsafe: (value: any) => Unsafe;
