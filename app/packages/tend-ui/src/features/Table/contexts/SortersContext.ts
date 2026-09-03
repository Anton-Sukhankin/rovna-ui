import { SorterConfig } from '@rovna-internal/components/features/Table/types';
import { contextFactory } from '@rovna-internal/components/factories/contextFactory';

type SortersContextType = {
  sorters: SorterConfig[];
};
const [SortersContext, useSortersContext] =
  contextFactory<SortersContextType>('Table.SortersContext');

export { SortersContext, useSortersContext };
export type { SortersContextType };
