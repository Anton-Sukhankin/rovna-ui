import { renderHook } from '@testing-library/react-hooks';

import { useSorters } from './useSorters';

describe('useSorters', () => {
  it('maps columns to sorter configs correctly', () => {
    const { result } = renderHook(() =>
      useSorters([
        { key: '1', id: '1', label: 'Column 1' },
        { key: '2', id: '2', label: 'Column 2' },
      ]),
    );

    expect(result.current).toEqual([
      { id: '1', key: 'rovna-ui-table-sorter-1', label: 'Column 1', name: '1' },
      { id: '2', key: 'rovna-ui-table-sorter-2', label: 'Column 2', name: '2' },
    ]);
  });
});
