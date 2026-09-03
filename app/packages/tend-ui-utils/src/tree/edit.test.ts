import { TreeNode } from '..';
import { edit } from './edit';

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

describe('edit', () => {
  it('edites node by key correctly', () => {
    const result = edit(
      nodes,
      { key: '2', value: 'Node 2 edited' },
      node => node.key === '2',
    );
    expect(result).toEqual([
      {
        key: '1',
        value: 'Node 1',
        children: [
          {
            key: '2',
            value: 'Node 2 edited',
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
  it('is immutable', () => {
    const result = edit(
      nodes,
      { key: '2', value: 'Node 2 edited' },
      node => node.key === '2',
    );
    expect(result).not.toBe(nodes);
  });
});
