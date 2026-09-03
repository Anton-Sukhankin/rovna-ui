import { contextFactory } from '@rovna-internal/components/factories';
import { SorterConfig } from '@rovna-internal/components/features/Table';

type SorterContextType = SorterConfig;

export const [SorterContext, useSorterContext] = contextFactory<SorterContextType>();
