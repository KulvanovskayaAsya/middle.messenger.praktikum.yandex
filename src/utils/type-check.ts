export type PlainObject<T = unknown> = {
  [k in string]: T;
};

export function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

export function isEmptyString(value: string): boolean {
  return value === '' || value.trim() === '';
}

export function isEmptyObject(value: PlainObject): boolean {
  return Object.keys(value).length === 0;
}
