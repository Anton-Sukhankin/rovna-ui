import { computeNeighbors } from './computeNeighbors';

const tree = [
  {
    parent: null,
    previous: null,
    current: {
      parent: null,
      node: {
        key: '1',
        value: 'Node 1',
      },
      depth: 0,
      index: 0,
    },
    next: {
      parent: null,
      node: {
        key: '2',
        value: 'Node 2',
      },
      depth: 0,
      index: 1,
    },
  },
  {
    parent: null,
    previous: {
      parent: null,
      node: {
        key: '1',
        value: 'Node 1',
      },
      depth: 0,
      index: 0,
    },
    current: {
      parent: null,
      node: {
        key: '2',
        value: 'Node 2',
      },
      depth: 0,
      index: 1,
    },
    next: {
      parent: null,
      node: {
        key: '3',
        value: 'Node 3',
      },
      depth: 0,
      index: 2,
    },
  },
  {
    parent: null,
    previous: {
      parent: null,
      node: {
        key: '2',
        value: 'Node 2',
      },
      depth: 0,
      index: 1,
    },
    current: {
      parent: null,
      node: {
        key: '3',
        value: 'Node 3',
      },
      depth: 0,
      index: 2,
    },
    next: {
      parent: null,
      node: {
        key: '4',
        value: 'Node 4',
      },
      depth: 0,
      index: 3,
    },
  },
  {
    parent: null,
    previous: {
      parent: null,
      node: {
        key: '3',
        value: 'Node 3',
      },
      depth: 0,
      index: 2,
    },
    current: {
      parent: null,
      node: {
        key: '4',
        value: 'Node 4',
      },
      depth: 0,
      index: 3,
    },
    next: {
      parent: null,
      node: {
        key: '5',
        value: 'Node 5',
      },
      depth: 0,
      index: 4,
    },
  },
  {
    parent: null,
    previous: {
      parent: null,
      node: {
        key: '4',
        value: 'Node 4',
      },
      depth: 0,
      index: 3,
    },
    current: {
      parent: null,
      node: {
        key: '5',
        value: 'Node 5',
      },
      depth: 0,
      index: 4,
    },
    next: null,
  },
];

describe('computeNeighbors', () => {
  describe.each([
    {
      dragged: tree[0],
      overed: tree[1],
      previous: tree[1].current,
      next: tree[2].current,
    },
    {
      dragged: tree[0],
      overed: tree[3],
      previous: tree[3].current,
      next: tree[4].current,
    },
  ])('when dragging node down', ts => {
    it('computes neighbors correctly', () => {
      const result = computeNeighbors(ts.dragged, ts.overed, 100);
      expect(result[0]).toEqual(ts.previous);
      expect(result[1]).toEqual(ts.next);
    });
  });
  describe.each([
    {
      dragged: tree[2],
      overed: tree[1],
      previous: tree[0].current,
      next: tree[1].current,
    },
  ])('when dragging node up', tc => {
    it('computes neighbors correctly', () => {
      const result = computeNeighbors(tc.dragged, tc.overed, -100);
      expect(result[0]).toEqual(tc.previous);
      expect(result[1]).toEqual(tc.next);
    });
  });
});
