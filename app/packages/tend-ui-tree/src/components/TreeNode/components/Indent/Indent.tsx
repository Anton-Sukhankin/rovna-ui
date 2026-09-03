import React from 'react';
import { Box } from '@rovna-ui/grid';
import { CellContext } from '@tanstack/react-table';

import { TreeData, TreeNode } from '@rovna-internal/tree/core';
import { Line } from '@rovna-internal/tree/ui/Line';
import { Branch } from '@rovna-internal/tree/ui/Branch';
import { useTreeRowContext } from '@rovna-internal/tree/contexts/TreeRowContext';
import { BranchEnd } from '@rovna-internal/tree/ui/BranchEnd';

const Indent = <T extends TreeData = TreeData>({
  context,
}: {
  context: CellContext<TreeNode<T>, string>;
}) => {
  const depth = context.row.depth;
  const { next } = useTreeRowContext('Indent');
  const children = React.useMemo(() => {
    return Array.from({ length: depth }).reduce<React.ReactElement[]>(
      (children, _, i) => {
        const isLastElement = i === depth - 1;

        /**
         * Если не последний элемент
         * просто возвращаем узел с вертикальной линией
         */
        if (!isLastElement) {
          children.push(<Line key={`${depth}-${i}`} />);

          return children;
        }

        if (!next) {
          children.push(<BranchEnd key={`${depth}-${i}`} />);

          return children;
        }

        /**
         * Если переходим с глубокой вложенности
         * на более высокую, то закрываем ветку
         */
        if (next.depth < depth) {
          children.push(<BranchEnd key={`${depth}-${i}`} />);

          return children;
        }

        /**
         * Иначе, добавляем ветку с 3 концами
         */
        children.push(<Branch key={`${depth}-${i}`} />);

        return children;
      },
      [],
    );
  }, [depth, next]);

  return (
    <Box $display='flex' className='rovna-ui-tree-indent'>
      {children}
    </Box>
  );
};

export { Indent };
