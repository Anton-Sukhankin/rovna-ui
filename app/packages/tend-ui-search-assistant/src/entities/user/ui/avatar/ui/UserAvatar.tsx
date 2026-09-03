import React, { useMemo } from 'react';
import { authStorage } from 'samolet-oauth2';

import { parseJwt } from '@search-assistant/shared/lib/utils/parseJwt';

import * as Styled from './Avatar.styled';

export const UserAvatar = () => {
  const data = useMemo(() => {
    const token = authStorage.getJwtAuthParams()?.access || '';
    const parsed = parseJwt(token);

    const picture = parsed?.picture;
    const initials = (() => {
      if (parsed?.family_name && parsed?.given_name) {
        return parsed.family_name[0] + parsed.given_name[0];
      }

      const nameParts = parsed?.name?.split(' ') ?? [];
      if (nameParts.length >= 2) {
        return nameParts[0][0] + nameParts[1][0];
      }

      return nameParts[0]?.[0] ?? '';
    })();

    return { picture, initials };
  }, []);

  if (data.picture) {
    return <Styled.Image src={data.picture} />;
  }

  return data.initials;
};
