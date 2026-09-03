import { contextFactory } from '@rovna-internal/components/factories/contextFactory';
import { ColumnConfig, ColumnPosition } from '@rovna-internal/components/components/ColumnsSettings/types';

type ColumnsContextType<TColumn extends ColumnConfig = ColumnConfig> = {
  columns: TColumn[];
  pin: (position: ColumnPosition, column: TColumn) => void;
  display: (visible: boolean, column: TColumn) => void;
};
const [ColumnsContext, _useColumnsContext] =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contextFactory<ColumnsContextType<any>>('Table.ColumnsContext');
const useColumnsContext = <TColumn extends ColumnConfig = ColumnConfig>() => {
  const ctx = _useColumnsContext();

  return ctx as ColumnsContextType<TColumn>;
};

export { ColumnsContext, useColumnsContext };
export type { ColumnsContextType };
