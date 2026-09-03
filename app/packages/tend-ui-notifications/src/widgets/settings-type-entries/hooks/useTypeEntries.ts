import { useMemo } from 'react';

import { useCurrentModuleSettings } from '@notifications/app/store/hooks';

export const useTypeEntries = () => {
  const { settings, changeSettings } = useCurrentModuleSettings();

  const typeEntries = useMemo(
    () =>
      structuredClone(settings?.notification_types)?.sort((a, b) =>
        a.type.localeCompare(b.type),
      ),
    [settings],
  );

  return { typeEntries, changeSettings };
};
