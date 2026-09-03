import React from 'react';
import { isUndefined } from '@rovna-ui/utils/isUndefined';
import { isString } from '@rovna-ui/utils/isString';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';

import { Box } from '@rovna-internal/components/grid/Box';
import { Title } from '@rovna-internal/components/typography/Title';
import { Paragraph } from '@rovna-internal/components/typography/Paragraph';
import { Button } from '@rovna-internal/components/primitives/Button';
import { Layout } from '@rovna-internal/components/components/Status/components/Layout';
import { WhaleSad } from '@rovna-internal/components/components/Status/WhaleSad';

import { InternalServerErrorProps } from './types';

export const InternalServerError = ({
  title,
  description,
  onClick = () => {
    window.location.reload();
  },
  button,
}: InternalServerErrorProps) => {
  const t = useTranslation();
  const _title = isUndefined(title)
    ? t(['components', 'Status', 'InternalServerError', 'title'])
    : title;
  const _description = isUndefined(description)
    ? t(['components', 'Status', 'InternalServerError', 'description'])
    : description;

  return (
    <Layout>
      <Box>
        <WhaleSad />
      </Box>
      <Box $display='flex' $flexDirection='column' $gap={16}>
        {isString(_title) ? (
          <Title level='h3' margin='0'>
            {_title}
          </Title>
        ) : (
          _title
        )}
        {isString(_description) ? (
          <Paragraph margin='0'>{_description}</Paragraph>
        ) : (
          _description
        )}
        <Button onClick={onClick} {...button}>
          {button?.children ?? t(['components', 'Status', 'button'])}
        </Button>
      </Box>
    </Layout>
  );
};
