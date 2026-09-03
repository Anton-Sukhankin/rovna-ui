import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Button } from '@rovna-ui/components/primitives';
import { useColors } from '@rovna-ui/theme';
import { Stand } from '@rovna-ui/types';

import { getSamoletHeaderUrl } from '@rovna-internal/header/consts';

const Support = ({ stand = 'prod' }: { stand?: Stand }) => {
  const t = useTranslation();
  const colors = useColors();
  const link = getSamoletHeaderUrl('support', stand);

  return (
    <Button
      type='button'
      // FIXME: Перевести на styling API
      style={{ padding: '8px', fontSize: '12px' }}
      variant='ghost'
      preset='accent'
      disabled={!link}
      UNSTABLE_styling={{
        buttonOnAccent: { ghostDefaultText: colors.gray0 },
      }}
      onClick={() => {
        if (!link) return;

        const linkUrl = new URL(link);
        linkUrl.searchParams.append('auth', 'true');

        window.open(linkUrl.href, '_blank');
      }}
    >
      {t(['widgets', 'Layout', 'Header', 'info'])}
    </Button>
  );
};

export { Support };
