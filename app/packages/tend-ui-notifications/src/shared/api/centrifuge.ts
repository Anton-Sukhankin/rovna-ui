import { Centrifuge } from 'centrifuge';
import { authStorage } from 'samolet-oauth2';

import { CENTRIFUGE_URL } from '@notifications/shared/consts/urls';

export const centrifugeClient = new Centrifuge(CENTRIFUGE_URL, {
  name: '@rovna-ui/notifications',
  data: {
    token: authStorage.getJwtAuthParams()?.access,
  },
});
