import { contextFactory } from '@rovna-internal/components/factories';

type CollapseContextType = {
  open: boolean;
  onClick: () => void;
};

export const [CollapseContext, useCollapseContext] =
  contextFactory<CollapseContextType>();
