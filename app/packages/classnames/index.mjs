function appendClass(result, value) {
  if (!value) return;

  if (typeof value === 'string' || typeof value === 'number') {
    result.push(String(value));
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) appendClass(result, item);
    return;
  }

  if (typeof value === 'object') {
    for (const key of Object.keys(value)) {
      if (value[key]) result.push(key);
    }
  }
}

export default function classNames(...args) {
  const result = [];

  for (const arg of args) appendClass(result, arg);

  return result.join(' ');
}

