function encode(value) {
  return encodeURIComponent(String(value));
}

function normalizeValue(value, options) {
  if (Array.isArray(value)) {
    if (options?.arrayFormat === 'comma') {
      return value.map(encode).join(',');
    }

    return value.map(encode);
  }

  return encode(value);
}

function stringify(input, options) {
  if (!input || typeof input !== 'object') return '';

  const parts = [];

  for (const key of Object.keys(input)) {
    const value = input[key];
    if (value === undefined || value === null) continue;

    const normalized = normalizeValue(value, options);

    if (Array.isArray(normalized)) {
      for (const item of normalized) {
        parts.push(`${encode(key)}=${item}`);
      }
      continue;
    }

    parts.push(`${encode(key)}=${normalized}`);
  }

  return parts.join('&');
}

module.exports = {
  stringify,
  default: {
    stringify,
  },
};
