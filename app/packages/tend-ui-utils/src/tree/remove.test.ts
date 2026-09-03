import { TreeNode } from '@rovna-internal/tree/core';

import { remove } from './remove';

const nodes: TreeNode[] = [
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
];

describe('remove', () => {
  it('finds node by key correctly', () => {
    const node = remove(nodes, node => node.key === '4');
    expect(node).toEqual([
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
                children: [],
              },
            ],
          },
        ],
      },
    ]);
  });
});
