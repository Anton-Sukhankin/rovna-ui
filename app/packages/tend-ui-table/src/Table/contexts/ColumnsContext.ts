import { contextFactory } from '@rovna-ui/factories';
import { ColumnConfig } from '@rovna-ui/components/components';

type ColumnsContextType<TColumn extends ColumnConfig = ColumnConfig> = {
  columns: TColumn[];
  pin: (position: 'left' | 'right' | 'none', column: TColumn) => void;
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
