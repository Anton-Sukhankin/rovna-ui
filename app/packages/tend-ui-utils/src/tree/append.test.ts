import { append } from './append';

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

describe('append', () => {
  it.each([
    {
      who: {
        key: '8',
        value: 'Node 8',
      },
      where: '1',
      expected: [
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
            {
              key: '8',
              value: 'Node 8',
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
    {
      who: {
        key: '8',
        value: 'Node 8',
      },
      where: '6',
      expected: [
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
        {
          key: '6',
          value: 'Node 6',
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
      ],
    },
    {
      who: {
        key: '8',
        value: 'Node 8',
      },
      where: '5',
      expected: [
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
                      children: [
                        {
                          key: '5',
                          value: 'Node 5',
                          children: [
                            {
                              key: '8',
                              value: 'Node 8',
                            },
                          ],
                        },
                      ],
                    },
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
      ],
    },
  ] as const)('appends node by key correctly', testcase => {
    const result = append(nodes, testcase.who, v => v.key === testcase.where);
    expect(result).toStrictEqual(testcase.expected);
  });

  it('does not append node by key correctly', () => {
    const result = append(nodes, { key: '6', value: 'Node 6' }, node => node.key === '0');
    expect(result).toEqual(nodes);
  });
});
