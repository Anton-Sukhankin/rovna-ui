'use strict';

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

function classNames(...args) {
  const result = [];

  for (const arg of args) appendClass(result, arg);

  return result.join(' ');
}

module.exports = classNames;
module.exports.default = classNames;
module.exports.classNames = classNames;
