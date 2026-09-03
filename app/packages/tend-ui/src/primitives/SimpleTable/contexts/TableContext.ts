import { contextFactory } from '@rovna-internal/components/factories';
import { Size } from '@rovna-internal/components/types/Size';

export const [TableContext, useTableContext] = contextFactory<{ size: Size }>();
