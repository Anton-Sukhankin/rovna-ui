import { useMemo } from 'react';

import { useCurrentModuleSettings } from '@notifications/app/store/hooks';

export const useTypeSenderEntries = () => {
  const { settings, changeSettings } = useCurrentModuleSettings();

  const typeSenderEntries = useMemo(
    () =>
      structuredClone(settings?.sender_types)?.sort((a, b) =>
        a.type.localeCompare(b.type),
      ),
    [settings],
  );

  return { typeSenderEntries, changeSettings };
};
