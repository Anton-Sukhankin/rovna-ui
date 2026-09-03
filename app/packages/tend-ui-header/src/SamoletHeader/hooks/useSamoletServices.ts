import { useApi } from '@rovna-ui/api';
import { Stand } from '@rovna-ui/types';

import { SamoletServicesResponse } from '@rovna-internal/header/SamoletHeader/hooks/types';
import { getSamoletHeaderUrl } from '@rovna-internal/header/consts';

export const useSamoletServices = (stand: Stand) => {
  const url = getSamoletHeaderUrl('servicesApi', stand);
  const { data, error, loading, request } = useApi<SamoletServicesResponse>({
    cache: {
      key: 'rovna-ui-samolet-services',
    },
    url: url ?? '',
  });

  return { data, loading, error, request, available: Boolean(url) };
};
