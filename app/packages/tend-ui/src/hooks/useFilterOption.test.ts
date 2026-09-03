import { renderHook } from '@testing-library/react-hooks';

import { useFilterOption } from './useFilterOption';

describe('useFilterOption', () => {
  it('filters options correctly', () => {
    const result = renderHook(() =>
      useFilterOption({
        filterOptionProp: 'label',
        filterOption: true,
        search: 'Option 1',
        options: [
          {
            label: 'Option 1',
          },
          {
            label: 'Option 2',
          },
          {
            label: 'Option 3',
          },
          {
            label: 'Option 4',
          },
        ],
      }),
    );

    expect(result.result.current).toEqual([
      {
        label: 'Option 1',
      },
    ]);
  });
});
