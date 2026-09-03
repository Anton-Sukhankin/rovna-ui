import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Button } from '@rovna-ui/components/primitives';
import { useColors } from '@rovna-ui/theme';
import { Stand } from '@rovna-ui/types';

import { getSamoletHeaderUrl } from '@rovna-internal/header/consts';

const Analytics = ({ stand = 'prod' }: { stand: Stand }) => {
  const colors = useColors();
  const t = useTranslation();
  const link = getSamoletHeaderUrl('analytics', stand);

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
        window.open(link, '_blank');
      }}
    >
      {t(['widgets', 'Layout', 'Header', 'analytics'])}
    </Button>
  );
};

export { Analytics };
