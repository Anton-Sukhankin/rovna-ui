import { traverse } from './traverse';

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
    ],
  },
];

describe('traverse', () => {
  it('executes "fn" on every node correctly', () => {
    let result = '';
    traverse(nodes, node => {
      result = result + node.value;
    });
    expect(result).toBe('Node 1Node 2Node 3Node 4Node 5');
  });
});
