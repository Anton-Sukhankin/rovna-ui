import { contextFactory } from '@rovna-ui/factories';

import { SorterConfig } from '@rovna-internal/table/Table/types';

type SortersContextType = {
  sorters: SorterConfig[];
};
const [SortersContext, useSortersContext] =
  contextFactory<SortersContextType>('Table.SortersContext');

export { SortersContext, useSortersContext };
export type { SortersContextType };
