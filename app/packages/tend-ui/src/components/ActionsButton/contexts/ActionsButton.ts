import { contextFactory } from '@rovna-internal/components/factories/contextFactory';

type ActionsButtonContextType = {
  open: boolean;
  display: (visible: boolean) => void;
};

export const [ActionsButtonContext, useActionsButtonContext] =
  contextFactory<ActionsButtonContextType>();
