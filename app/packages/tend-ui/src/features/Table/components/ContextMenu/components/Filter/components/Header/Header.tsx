import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';

import { Text } from '@rovna-internal/components/typography/Text';

export const Header = () => {
  const t = useTranslation();

  return (
    <Text color='gray650' size='small'>
      {t(['features', 'Table', 'filter'])}
    </Text>
  );
};
