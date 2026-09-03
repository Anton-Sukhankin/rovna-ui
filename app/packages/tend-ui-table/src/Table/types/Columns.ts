import {
  ColumnGroupType as PrimitiveColumnGroupType,
  ColumnType as PrimitiveColumnType,
  RowSelection as PrimitiveRowSelection,
} from '@rovna-ui/components/primitives/Table';
import { ColumnConfig as DefaultColumnConfig } from '@rovna-ui/components/components/ColumnsSettings/types';

// FIXME: Свойство `align` нужно расшриять в рамках `ColumnsSettings`
export type ColumnConfig = DefaultColumnConfig &
  Pick<PrimitiveColumnType<unknown>, 'align'>;
export type ColumnType<T> = PrimitiveColumnType<T> & ColumnConfig;
export type ColumnGroupType<T> = PrimitiveColumnGroupType<T>;
export type ColumnsType<T> = (ColumnType<T> | PrimitiveColumnGroupType<T>)[];
export type RowSelection<T> = PrimitiveRowSelection<T>;
