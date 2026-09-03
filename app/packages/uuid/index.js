'use strict';

const hex = [];

for (let index = 0; index < 256; index += 1) {
  hex[index] = (index + 0x100).toString(16).slice(1);
}

function getCrypto() {
  if (typeof globalThis !== 'undefined' && globalThis.crypto) {
    return globalThis.crypto;
  }

  return undefined;
}

function fillRandom(bytes) {
  const crypto = getCrypto();

  if (crypto && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes);
    return bytes;
  }

  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = Math.floor(Math.random() * 256);
  }

  return bytes;
}

function stringify(bytes) {
  return [
    hex[bytes[0]],
    hex[bytes[1]],
    hex[bytes[2]],
    hex[bytes[3]],
    '-',
    hex[bytes[4]],
    hex[bytes[5]],
    '-',
    hex[bytes[6]],
    hex[bytes[7]],
    '-',
    hex[bytes[8]],
    hex[bytes[9]],
    '-',
    hex[bytes[10]],
    hex[bytes[11]],
    hex[bytes[12]],
    hex[bytes[13]],
    hex[bytes[14]],
    hex[bytes[15]],
  ].join('');
}

function v4() {
  const crypto = getCrypto();

  if (crypto && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  const bytes = fillRandom(new Uint8Array(16));

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  return stringify(bytes);
}

module.exports = {
  v4,
};
module.exports.default = module.exports;
