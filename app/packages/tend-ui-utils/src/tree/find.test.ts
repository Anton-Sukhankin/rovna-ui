import { find } from './find';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nodes: any[] = [
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
];

describe('find', () => {
  it.each([
    {
      founding: '3',
      expected: {
        key: '3',
        value: 'Node 3',
      },
    },
    {
      founding: '5',
      expected: {
        key: '5',
        value: 'Node 5',
      },
    },
    {
      founding: '7',
      expected: {
        key: '7',
        value: 'Node 7',
      },
    },
  ])('finds node by key correctly', testcase => {
    const node = find(nodes, node => node.key === testcase.founding);
    expect(node).toEqual(expect.objectContaining(testcase.expected));
  });

  it('does not find node by key correctly', () => {
    const node = find(nodes, node => node.key === '999');
    expect(node).toBeUndefined();
  });
});
