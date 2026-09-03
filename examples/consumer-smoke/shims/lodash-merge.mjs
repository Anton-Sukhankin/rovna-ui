function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export default function merge(target, ...sources) {
  const output = isObject(target) ? target : {};

  for (const source of sources) {
    if (!isObject(source)) continue;

    for (const [key, value] of Object.entries(source)) {
      if (isObject(value)) {
        output[key] = merge(isObject(output[key]) ? output[key] : {}, value);
      } else {
        output[key] = value;
      }
    }
  }

  return output;
}

