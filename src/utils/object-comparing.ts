// сравнение с null и проверка типа доступны для любых значений, при этом предугадать типы невозможно
function isObject(object: any): boolean {
  return object != null && typeof object === 'object';
}

function isEqual<T>(object1: T, object2: T): boolean {
  if (object1 === object2) {
    return true;
  }

  if (typeof object1 !== 'object' || object1 === null || typeof object2 !== 'object' || object2 === null) {
    return false;
  }

  const keys1 = Object.keys(object1) as (keyof T)[];
  const keys2 = Object.keys(object2) as (keyof T)[];

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);

    if ((areObjects && !isEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false;
    }
  }

  return true;
}

export default isEqual;
