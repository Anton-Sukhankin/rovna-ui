import { filter } from './filter';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let nodes: any[] = [];

beforeEach(() => {
  nodes = [
    {
      key: '1',
      value: 'Node 1',
      children: [
        {
          key: '2',
          value: 'Node 2',
          children: [
            {
              key: '3',
              value: 'Node 3',
              children: [
                { key: '4', value: 'Node 4', children: [{ key: '5', value: 'Node 5' }] },
              ],
            },
          ],
        },
      ],
    },
    {
      key: '6',
      value: 'Node 6',
      children: [
        {
          key: '7',
          value: 'Node 7',
        },
      ],
    },
  ];
});

describe('filter', () => {
  it.each([
    {
      who: '1',
      expected: [
        {
          key: '6',
          value: 'Node 6',
          children: [
            {
              key: '7',
              value: 'Node 7',
            },
          ],
        },
      ],
    },
  ] as const)('returns correct result', testcase => {
    const result = filter(nodes, v => v.key !== testcase.who);
    expect(result).toStrictEqual(testcase.expected);
  });
});
