import type { TableProps as AntTableProps } from 'antd-core/es/table';

type AntRowClassNameFunction<T> = NonNullable<
  Exclude<AntTableProps<T>['rowClassName'], string>
>;

export type RowClassName<T> = AntRowClassNameFunction<T> | string;
