import { renderHook } from '@testing-library/react-hooks';

import { useDependsGraph } from '.';
import { FilterConfig } from '..';

describe('useDependsGraph', () => {
  describe('when the given "filters" is empty', () => {
    it('returns correct result', () => {
      const { result } = renderHook(() => useDependsGraph());
      expect(result.current).toEqual({});
    });
  });
  describe('when given "filters" parameter is not empty', () => {
    it('groups dependencies into graph correctly', () => {
      const filters: FilterConfig[] = [
        { id: 'number', name: 'number', component: { component: 'input' } },
        { id: 'name', name: 'name', component: { component: 'input' } },
        { id: 'contractor', name: 'contractor', component: { component: 'input' } },
        {
          id: 'provider',
          name: 'provider',
          component: { component: 'input' },
          depends: ['contractor', 'number'],
        },
        {
          id: 'date',
          name: 'date',
          component: { component: 'date-picker' },
          depends: ['provider'],
        },
      ];
      const { result } = renderHook(() => useDependsGraph(filters));

      expect(result.current).toEqual({
        provider: ['contractor', 'number'],
        date: ['provider'],
      });
    });
  });
});
