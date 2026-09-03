import { renderHook } from '@testing-library/react-hooks';

import { useFilter } from './useFilter';

describe('useFilter', () => {
  it('returns correct result', () => {
    const result = renderHook(() =>
      useFilter(
        [
          {
            id: '1',
            label: 'Filter 1',
            name: 'filter-1',
            component: { component: 'input' },
          },
          {
            id: '2',
            label: 'Filter 2',
            name: 'filter-2',
            component: { component: 'input' },
          },
          {
            id: '3',
            label: 'Filter 3',
            name: 'filter-3',
            component: { component: 'input' },
          },
        ],
        '2',
      ),
    );

    expect(result.result.current).toEqual([
      {
        id: '2',
        label: 'Filter 2',
        name: 'filter-2',
        component: { component: 'input' },
      },
    ]);
  });

  it('returns empty tuple if Filter not exists', () => {
    const result = renderHook(() =>
      useFilter(
        [
          {
            id: '1',
            label: 'Filter 1',
            name: 'filter-1',
            component: { component: 'input' },
          },
          {
            id: '2',
            label: 'Filter 2',
            name: 'filter-2',
            component: { component: 'input' },
          },
          {
            id: '3',
            label: 'Filter 3',
            name: 'filter-3',
            component: { component: 'input' },
          },
        ],
        'none',
      ),
    );

    expect(result.result.current).toEqual([]);
  });
});
