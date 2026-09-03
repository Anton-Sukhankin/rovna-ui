import { flatten } from './flatten';

const nodes = [
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

describe('flatten', () => {
  it('flats array correctly', () => {
    const result = flatten(nodes);
    expect(result).toEqual([
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
      {
        key: '4',
        value: 'Node 4',
        children: [{ key: '5', value: 'Node 5' }],
      },
      { key: '5', value: 'Node 5' },
    ]);
  });

  it('flats array with custom property correctly', () => {
    const result = flatten(
      [
        {
          key: '1',
          value: 'Node 1',
          siblings: [
            {
              key: '2',
              value: 'Node 2',
              siblings: [
                {
                  key: '3',
                  value: 'Node 3',
                  siblings: [
                    {
                      key: '4',
                      value: 'Node 4',
                      siblings: [{ key: '5', value: 'Node 5' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      'siblings',
    );
    expect(result).toEqual([
      {
        key: '1',
        value: 'Node 1',
        siblings: [
          {
            key: '2',
            value: 'Node 2',
            siblings: [
              {
                key: '3',
                value: 'Node 3',
                siblings: [
                  {
                    key: '4',
                    value: 'Node 4',
                    siblings: [{ key: '5', value: 'Node 5' }],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: '2',
        value: 'Node 2',
        siblings: [
          {
            key: '3',
            value: 'Node 3',
            siblings: [
              {
                key: '4',
                value: 'Node 4',
                siblings: [{ key: '5', value: 'Node 5' }],
              },
            ],
          },
        ],
      },
      {
        key: '3',
        value: 'Node 3',
        siblings: [
          {
            key: '4',
            value: 'Node 4',
            siblings: [{ key: '5', value: 'Node 5' }],
          },
        ],
      },
      {
        key: '4',
        value: 'Node 4',
        siblings: [{ key: '5', value: 'Node 5' }],
      },
      { key: '5', value: 'Node 5' },
    ]);
  });
});
