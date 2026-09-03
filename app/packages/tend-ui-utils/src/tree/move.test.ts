import { EXPERIMENTAL_move as move } from './move';

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
        },
        {
          key: '3',
          value: 'Node 3',
        },
      ],
    },
    {
      key: '4',
      value: 'Node 4',
      children: [
        {
          key: '5',
          value: 'Node 5',
        },
        {
          key: '7',
          value: 'Node 7',
        },
      ],
    },
  ];
});

describe('move', () => {
  it.each([
    {
      who: '1',
      where: '4',
      expected: [
        {
          key: '4',
          value: 'Node 4',
          children: [
            {
              key: '5',
              value: 'Node 5',
            },
            {
              key: '7',
              value: 'Node 7',
            },
            {
              key: '1',
              value: 'Node 1',
              children: [
                {
                  key: '2',
                  value: 'Node 2',
                },
                {
                  key: '3',
                  value: 'Node 3',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      who: '2',
      where: '3',
      expected: [
        {
          key: '1',
          value: 'Node 1',
          children: [
            {
              key: '3',
              value: 'Node 3',
              children: [
                {
                  key: '2',
                  value: 'Node 2',
                },
              ],
            },
          ],
        },
        {
          key: '4',
          value: 'Node 4',
          children: [
            {
              key: '5',
              value: 'Node 5',
            },
            {
              key: '7',
              value: 'Node 7',
            },
          ],
        },
      ],
    },
    {
      who: '7',
      where: '3',
      expected: [
        {
          key: '1',
          value: 'Node 1',
          children: [
            {
              key: '2',
              value: 'Node 2',
            },
            {
              key: '3',
              value: 'Node 3',
              children: [
                {
                  key: '7',
                  value: 'Node 7',
                },
              ],
            },
          ],
        },
        {
          key: '4',
          value: 'Node 4',
          children: [
            {
              key: '5',
              value: 'Node 5',
            },
          ],
        },
      ],
    },
  ] as const)('moves element correctly', testcase => {
    const result = move(
      nodes,
      w => w.key === testcase.who,
      t => t.key === testcase.where,
    );
    expect(result).toStrictEqual(testcase.expected);
  });
});
