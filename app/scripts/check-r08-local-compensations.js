const assert = require('assert');
const path = require('path');

const packagesRoot = path.resolve(__dirname, '..', 'packages');
const lodash = require(path.join(packagesRoot, 'lodash'));
const uuid = require(path.join(packagesRoot, 'uuid'));

function assertPrototypeSafe(label, operation) {
  delete Object.prototype.r08Polluted;
  operation();
  assert.strictEqual(Object.prototype.r08Polluted, undefined, `${label} polluted Object.prototype`);
  assert.strictEqual({}.r08Polluted, undefined, `${label} leaked a prototype value`);
}

assertPrototypeSafe('merge', () => {
  lodash.merge({}, JSON.parse('{"__proto__":{"r08Polluted":true}}'));
});
assertPrototypeSafe('mergeWith', () => {
  lodash.mergeWith({}, { constructor: { prototype: { r08Polluted: true } } });
});
assertPrototypeSafe('cloneDeep', () => {
  lodash.cloneDeep(JSON.parse('{"__proto__":{"r08Polluted":true}}'));
});

const generated = [uuid.v4(), uuid.v4(), uuid.v4()];
const uuidV4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
assert.strictEqual(generated.every(value => uuidV4Pattern.test(value)), true, 'Generated UUIDs must be v4');
assert.strictEqual(new Set(generated).size, generated.length, 'Generated UUIDs must be unique');
assert.strictEqual(typeof uuid.default.v4, 'function', 'Default UUID export must expose v4');

console.log('R-08 local compensation security: passed');
console.log('Prototype pollution checks: 3/3');
console.log('UUID checks: 3/3');
