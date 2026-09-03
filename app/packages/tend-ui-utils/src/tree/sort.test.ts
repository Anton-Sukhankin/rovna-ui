import { TreeNode } from '@rovna-internal/tree/core';

import { sort } from './sort';

const nodes: TreeNode[] = [
  {
    key: '3',
    value: 'Node 3',
    children: [
      {
        key: '6',
        value: 'Node 6',
      },
      {
        key: '5',
        value: 'Node 5',
      },
    ],
  },
  {
    key: '1',
    value: 'Node 1',
    children: [
      {
        key: '8',
        value: 'Node 8',
      },
      {
        key: '7',
        value: 'Node 7',
      },
    ],
  },
  {
    key: '2',
    value: 'Node 2',
  },
];

describe('sort', () => {
  it('finds node by key correctly', () => {
    const node = sort(nodes, (a, b) => a.value.localeCompare(b.value));
    expect(node).toEqual([
      {
        key: '1',
        value: 'Node 1',
        children: [
          {
            key: '7',
            value: 'Node 7',
          },
          {
            key: '8',
            value: 'Node 8',
          },
        ],
      },
      {
        key: '2',
        value: 'Node 2',
      },
      {
        key: '3',
        value: 'Node 3',
        children: [
          {
            key: '5',
            value: 'Node 5',
          },

          {
            key: '6',
            value: 'Node 6',
          },
        ],
      },
    ]);
  });
});
