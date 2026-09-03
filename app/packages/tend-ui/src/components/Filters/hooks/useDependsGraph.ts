import React from 'react';

import { FilterConfig } from '..';

export const useDependsGraph = (filters?: FilterConfig[]) => {
  return React.useMemo(() => {
    if (!filters) return {};

    return filters.reduce<Record<string, string[]>>((graph, value) => {
      if (!value.depends) return graph;
      value.depends.forEach(dependency => {
        if (Array.isArray(graph[value.name])) {
          graph[value.name].push(dependency);

          return;
        }

        graph[value.name] = [];
        graph[value.name].push(dependency);
      });

      return graph;
    }, {});
  }, [filters]);
};
