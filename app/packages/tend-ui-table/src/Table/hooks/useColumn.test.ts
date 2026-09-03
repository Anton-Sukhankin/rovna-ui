import { renderHook } from '@testing-library/react-hooks';

import { useColumn } from './useColumn';

describe('useColumn', () => {
  it('returns correct result', () => {
    const result = renderHook(() =>
      useColumn(
        [
          { id: '1', label: 'Column 1' },
          { id: '2', label: 'Column 2' },
          { id: '3', label: 'Column 3' },
        ],
        '2',
      ),
    );

    expect(result.result.current).toEqual([{ id: '2', label: 'Column 2' }]);
  });

  it('returns empty tuple if column not exists', () => {
    const result = renderHook(() =>
      useColumn(
        [
          { id: '1', label: 'Column 1' },
          { id: '2', label: 'Column 2' },
          { id: '3', label: 'Column 3' },
        ],
        'random',
      ),
    );

    expect(result.result.current).toEqual([]);
  });
});
