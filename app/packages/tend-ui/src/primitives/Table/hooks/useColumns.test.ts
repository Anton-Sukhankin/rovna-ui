import { renderHook } from '@testing-library/react-hooks';

import { useColumns } from './useColumns';

describe('useColumns', () => {
  it('returns correct result', () => {
    const { result } = renderHook(() =>
      useColumns([{ key: '1', title: 'Name', dataIndex: 'name' }]),
    );
    expect(result.current[0].sortIcon).toBeDefined();
    expect(result.current[0].filterIcon).toBeDefined();
  });
});
