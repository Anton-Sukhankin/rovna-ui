import { Row } from '@tanstack/react-table';

function traverse<T>(nodes: Row<T>[], fn: (node: Row<T>) => void) {
  nodes.forEach(node => {
    fn(node);
    if (Array.isArray(node.subRows) && node.subRows.length > 0) {
      traverse(node.subRows, fn);
    }
  });
}

export const includesStringAndChildren = <T>(row: Row<T>, id: string, value: string) => {
  const search = value.toLowerCase();
  const isMatchedBySearch = !!row
    .getValue<string | null>(id)
    ?.toString()
    ?.toLowerCase()
    ?.includes(search);

  const isMatchedByParent = row.columnFiltersMeta.passed === true;

  if (isMatchedByParent) return true;

  if (isMatchedBySearch) {
    traverse(row.subRows, node => {
      node.columnFiltersMeta.passed = true;
    });

    return true;
  } else {
    traverse(row.subRows, node => {
      node.columnFiltersMeta.passed = false;
    });

    return false;
  }
};
