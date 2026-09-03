import { renderHook } from '@testing-library/react-hooks';

import { useNextFilterName } from './useNextFilterName';

describe.each([
  {
    value: ['Сохраненный фильтр 1'],
    expected: 'Сохраненный фильтр 2',
  },
  {
    value: ['Сохраненный фильтр 1', 'Сохраненный фильтр 3'],
    expected: 'Сохраненный фильтр 2',
  },
  {
    value: ['Сохраненный фильтр 1', 'Сохраненный фильтр 2', 'Сохраненный фильтр 3'],
    expected: 'Сохраненный фильтр 4',
  },
  {
    value: ['Сохраненный фильтр 8', 'Сохраненный фильтр 9', 'Сохраненный фильтр 10'],
    expected: 'Сохраненный фильтр 1',
  },
])('useNextFilterName given $value', testcase => {
  it('returns correct result', () => {
    const { result } = renderHook(() => useNextFilterName(testcase.value));
    expect(result.current).toEqual(testcase.expected);
  });
});
