import { renderHook } from '@testing-library/react-hooks';

import { useLabeledSorters } from './useLabeledSorters';

describe('useLabeledSorters', () => {
  it('returns sorters with default "label" value', () => {
    const sorters = [
      {
        key: '1',
        id: 'contractor',
        name: 'contractor',
      },
    ];
    const columns = [
      {
        key: '1',
        id: 'contractor',
        label: 'Подрядчик',
      },
    ];

    const { result } = renderHook(() => useLabeledSorters(sorters, columns));

    expect(result.current).toEqual([
      {
        key: '1',
        id: 'contractor',
        name: 'contractor',
        label: 'Подрядчик',
      },
    ]);
  });

  it('returns sorters with own "label" value', () => {
    const sorters = [
      {
        key: '1',
        id: 'contractor',
        name: 'contractor',
        label: 'Подрядчик',
      },
    ];
    const columns = [
      {
        key: '1',
        id: 'contractor',
        label: 'Подрядчик (колонка)',
      },
    ];

    const { result } = renderHook(() => useLabeledSorters(sorters, columns));

    expect(result.current).toEqual([
      {
        key: '1',
        id: 'contractor',
        name: 'contractor',
        label: 'Подрядчик',
      },
    ]);
  });
});
