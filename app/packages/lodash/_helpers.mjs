const unsafePropertyNames = new Set(['__proto__', 'prototype', 'constructor']);

function isSafeProperty(property) {
  return typeof property === 'symbol' || !unsafePropertyNames.has(String(property));
}

function toPathArray(paths) {
  if (Array.isArray(paths)) return paths.map(String);
  if (paths === undefined || paths === null) return [];
  return [String(paths)];
}

function toPathSegments(path) {
  if (Array.isArray(path)) return path.map(String);

  return String(path)
    .replace(/\[([^\]]+)\]/g, '.$1')
    .split('.')
    .filter(Boolean);
}

function readPath(source, segments) {
  let current = source;

  for (const segment of segments) {
    if (!isSafeProperty(segment)) return { exists: false };
    if (current === undefined || current === null) return { exists: false };
    const object = Object(current);
    if (!Object.prototype.hasOwnProperty.call(object, segment)) return { exists: false };
    current = object[segment];
  }

  return { exists: true, value: current };
}

function writePath(target, segments, value) {
  if (segments.some(segment => !isSafeProperty(segment))) return;

  let current = target;

  segments.forEach((segment, index) => {
    if (index === segments.length - 1) {
      current[segment] = value;
      return;
    }

    if (!isPlainObject(current[segment]) && !Array.isArray(current[segment])) {
      current[segment] = /^\d+$/.test(segments[index + 1]) ? [] : {};
    }

    current = current[segment];
  });
}

function copyOwnEnumerable(source) {
  if (source === undefined || source === null) return {};

  const result = {};

  for (const key of Object.keys(Object(source))) {
    if (isSafeProperty(key)) result[key] = source[key];
  }

  return result;
}

function getIterateeValue(value, iteratee) {
  if (typeof iteratee === 'function') return iteratee(value);
  if (iteratee === undefined || iteratee === null) return value;

  return value?.[iteratee];
}

export function isPlainObject(value) {
  if (value === null || typeof value !== 'object') return false;

  const prototype = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
}

export function debounce(fn, wait = 0, options = {}) {
  let timerId;
  let lastArgs;
  let lastThis;
  let result;
  const delay = Number(wait) || 0;
  const leading = Boolean(options.leading);
  const trailing = options.trailing !== false;

  const invoke = () => {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = undefined;
    lastThis = undefined;
    result = fn.apply(thisArg, args);

    return result;
  };

  const debounced = function debouncedFunction(...args) {
    const shouldCallLeading = leading && timerId === undefined;

    lastArgs = args;
    lastThis = this;

    if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      timerId = undefined;

      if (trailing && lastArgs) {
        invoke();
      }
    }, delay);

    if (shouldCallLeading) {
      return invoke();
    }

    return result;
  };

  debounced.cancel = () => {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    timerId = undefined;
    lastArgs = undefined;
    lastThis = undefined;
  };

  debounced.flush = () => {
    if (timerId === undefined) return result;

    clearTimeout(timerId);
    timerId = undefined;

    if (lastArgs) {
      return invoke();
    }

    return result;
  };

  return debounced;
}

function mergeValue(targetValue, sourceValue) {
  if (Array.isArray(sourceValue)) {
    return sourceValue.slice();
  }

  if (isPlainObject(sourceValue)) {
    return merge(isPlainObject(targetValue) ? targetValue : {}, sourceValue);
  }

  return sourceValue;
}

export function merge(target, ...sources) {
  const result = isPlainObject(target) ? target : {};

  for (const source of sources) {
    if (source === undefined || source === null) continue;

    for (const key of Object.keys(Object(source))) {
      if (!isSafeProperty(key)) continue;
      result[key] = mergeValue(result[key], source[key]);
    }
  }

  return result;
}

export function isEqual(left, right) {
  if (Object.is(left, right)) return true;

  if (Array.isArray(left) || Array.isArray(right)) {
    if (!Array.isArray(left) || !Array.isArray(right)) return false;
    if (left.length !== right.length) return false;

    return left.every((value, index) => isEqual(value, right[index]));
  }

  if (isPlainObject(left) || isPlainObject(right)) {
    if (!isPlainObject(left) || !isPlainObject(right)) return false;

    const leftKeys = Object.keys(left);
    const rightKeys = Object.keys(right);

    if (leftKeys.length !== rightKeys.length) return false;

    return leftKeys.every(
      key => Object.prototype.hasOwnProperty.call(right, key) && isEqual(left[key], right[key]),
    );
  }

  return false;
}

export function isEqualWith(left, right, customizer, key, leftParent, rightParent) {
  const customized = typeof customizer === 'function'
    ? customizer(left, right, key, leftParent, rightParent)
    : undefined;

  if (customized !== undefined) return Boolean(customized);
  if (Object.is(left, right)) return true;

  if (Array.isArray(left) || Array.isArray(right)) {
    if (!Array.isArray(left) || !Array.isArray(right)) return false;
    if (left.length !== right.length) return false;

    return left.every((value, index) =>
      isEqualWith(value, right[index], customizer, index, left, right),
    );
  }

  if (isPlainObject(left) || isPlainObject(right)) {
    if (!isPlainObject(left) || !isPlainObject(right)) return false;

    const leftKeys = Object.keys(left);
    const rightKeys = Object.keys(right);

    if (leftKeys.length !== rightKeys.length) return false;

    return leftKeys.every(
      childKey =>
        Object.prototype.hasOwnProperty.call(right, childKey) &&
        isEqualWith(left[childKey], right[childKey], customizer, childKey, left, right),
    );
  }

  return false;
}

export function chunk(array, size) {
  const length = Array.isArray(array) ? array.length : 0;
  const normalizedSize = Math.floor(Number(size) || 1);

  if (!length || normalizedSize < 1) return [];

  const result = [];

  for (let index = 0; index < length; index += normalizedSize) {
    result.push(array.slice(index, index + normalizedSize));
  }

  return result;
}

export function uniq(array) {
  if (!Array.isArray(array)) return [];

  return Array.from(new Set(array));
}

export function groupBy(collection, iteratee) {
  if (!Array.isArray(collection)) return {};

  return collection.reduce((result, item) => {
    const key = String(getIterateeValue(item, iteratee));

    if (!isSafeProperty(key)) return result;

    if (!result[key]) result[key] = [];
    result[key].push(item);

    return result;
  }, {});
}

export function mapValues(object, iteratee) {
  if (object === undefined || object === null) return {};

  const source = Object(object);
  const result = {};

  for (const key of Object.keys(source)) {
    if (!isSafeProperty(key)) continue;
    result[key] =
      typeof iteratee === 'function' ? iteratee(source[key], key, source) : source[key];
  }

  return result;
}

export function pickBy(object, predicate = identity) {
  if (object === undefined || object === null) return {};

  const source = Object(object);
  const result = {};

  for (const key of Object.keys(source)) {
    if (!isSafeProperty(key)) continue;
    const value = source[key];

    if (predicate(value, key)) {
      result[key] = value;
    }
  }

  return result;
}

export function omitBy(object, predicate = identity) {
  if (object === undefined || object === null) return {};

  const source = Object(object);
  const result = {};

  for (const key of Object.keys(source)) {
    if (!isSafeProperty(key)) continue;
    const value = source[key];

    if (!predicate(value, key)) {
      result[key] = value;
    }
  }

  return result;
}

export function isEmpty(value) {
  if (value === undefined || value === null) return true;
  if (typeof value === 'string' || Array.isArray(value)) return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;

  return true;
}

export function uniqBy(array, iteratee) {
  if (!Array.isArray(array)) return [];

  const seen = new Set();
  const result = [];

  for (const item of array) {
    const key = getIterateeValue(item, iteratee);

    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }

  return result;
}

export function omit(object, paths) {
  const result = copyOwnEnumerable(object);

  for (const key of toPathArray(paths)) {
    delete result[key];
  }

  return result;
}

export function pick(object, paths) {
  if (object === undefined || object === null) return {};

  const source = Object(object);
  const result = {};

  for (const path of toPathArray(paths)) {
    if (!isSafeProperty(path)) continue;
    if (Object.prototype.hasOwnProperty.call(source, path)) {
      result[path] = source[path];
      continue;
    }

    const segments = toPathSegments(path);
    const selected = readPath(source, segments);
    if (selected.exists) writePath(result, segments, selected.value);
  }

  return result;
}

export function identity(value) {
  return value;
}

export function isNil(value) {
  return value === null || value === undefined;
}

export function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

function toWords(value) {
  return (
    String(value)
      .replace(/['\u2019]/g, '')
      .match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])|\d+/g) || []
  );
}

export function camelCase(value) {
  return toWords(value)
    .map((word, index) => {
      const normalized = word.toLowerCase();
      return index === 0
        ? normalized
        : `${normalized.charAt(0).toUpperCase()}${normalized.slice(1)}`;
    })
    .join('');
}

export function upperFirst(value) {
  const string = String(value);
  return string ? `${string.charAt(0).toUpperCase()}${string.slice(1)}` : '';
}

export function kebabCase(value) {
  return toWords(value)
    .map(word => word.toLowerCase())
    .join('-');
}

export function startCase(value) {
  return toWords(value)
    .map(word => upperFirst(word.toLowerCase()))
    .join(' ');
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function cloneDeep(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value;
  if (seen.has(value)) return seen.get(value);
  if (value instanceof Date) return new Date(value.getTime());

  const result = Array.isArray(value)
    ? []
    : Object.create(Object.getPrototypeOf(value));
  seen.set(value, result);

  for (const key of Reflect.ownKeys(value)) {
    if (!isSafeProperty(key)) continue;
    result[key] = cloneDeep(value[key], seen);
  }

  return result;
}

export function countBy(collection, iteratee = identity) {
  const result = {};
  const values = Array.isArray(collection)
    ? collection
    : Object.values(collection || {});

  for (const value of values) {
    const key = String(getIterateeValue(value, iteratee));
    if (!isSafeProperty(key)) continue;
    result[key] = (result[key] || 0) + 1;
  }

  return result;
}

export function mapKeys(object, iteratee = (_value, key) => key) {
  if (object === undefined || object === null) return {};
  const result = {};

  for (const [key, value] of Object.entries(Object(object))) {
    const mappedKey = String(iteratee(value, key, object));
    if (isSafeProperty(mappedKey)) result[mappedKey] = value;
  }

  return result;
}

export function mergeWith(object, ...sources) {
  const customizer = isFunction(sources[sources.length - 1]) ? sources.pop() : undefined;
  const target = object === undefined || object === null ? {} : object;

  for (const source of sources) {
    if (source === undefined || source === null) continue;

    for (const key of Object.keys(Object(source))) {
      if (!isSafeProperty(key)) continue;
      const customized = customizer?.(target[key], source[key], key, target, source);

      if (customized !== undefined) {
        target[key] = customized;
      } else if (isPlainObject(target[key]) && isPlainObject(source[key])) {
        target[key] = mergeWith(target[key], source[key], customizer);
      } else {
        target[key] = cloneDeep(source[key]);
      }
    }
  }

  return target;
}

export function throttle(fn, wait = 0, options = {}) {
  return debounce(fn, wait, {
    leading: options.leading !== false,
    trailing: options.trailing !== false,
    maxWait: wait,
  });
}

export default {
  camelCase,
  chunk,
  cloneDeep,
  countBy,
  debounce,
  groupBy,
  identity,
  isEqual,
  isEqualWith,
  isEmpty,
  isFunction,
  isNil,
  isPlainObject,
  isString,
  kebabCase,
  mapKeys,
  mapValues,
  merge,
  mergeWith,
  omit,
  omitBy,
  pick,
  pickBy,
  startCase,
  throttle,
  uniq,
  uniqBy,
  upperFirst,
};
