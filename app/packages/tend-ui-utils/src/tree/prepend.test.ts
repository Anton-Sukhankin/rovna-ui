import { TreeNode } from '..';
import { prepend } from './prepend';

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

describe('prepend', () => {
  it.failing('adds node by key correctly', () => {
    const result = prepend(
      nodes,
      { key: '6', value: 'Node 6' },
      node => node.key === '6',
    );
    expect(result).toEqual([
      { key: '6', value: 'Node 6' },
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
                  {
                    key: '4',
                    value: 'Node 4',
                    children: [{ key: '5', value: 'Node 5' }],
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);
  });

  it('does not prepend node by key correctly', () => {
    const result = prepend(
      nodes,
      { key: '6', value: 'Node 6' },
      node => node.key === '6',
    );
    expect(result).toEqual(nodes);
  });
});
