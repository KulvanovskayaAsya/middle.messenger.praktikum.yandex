import { isArray, isPlainObject } from './type-check.ts';

function isEqual<T>(lhs: T, rhs: T): boolean {
  if (lhs === rhs) {
    return true;
  }

  if (!isPlainObject(lhs) || !isPlainObject(rhs)) {
    return false;
  }

  const keys1 = Object.keys(lhs) as (keyof T)[];
  const keys2 = Object.keys(rhs) as (keyof T)[];

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const value1 = lhs[key];
    const value2 = rhs[key];

    if (isArray(value1) && isArray(value2)) {
      if (!isEqual(value1, value2)) {
        return false;
      }
    } else if (isPlainObject(value1) && isPlainObject(value2)) {
      if (!isEqual(value1, value2)) {
        return false;
      }
    } else if (value1 !== value2) {
      return false;
    }
  }

  return true;
}

export default isEqual;
