import { formatServiceName } from './utils';

describe('formatServiceName', () => {
  it.each([
    ['s.pass', 'S.Pass'],
    ['s.pass-report', 'S.Pass Report'],
    ['s.cp', 'S.CP'],
  ] as const)('returns correct result for %s', (service, expected) => {
    expect(formatServiceName(service)).toBe(expected);
  });
});
