import React from 'react';
import { isUndefined } from '@rovna-ui/utils/isUndefined';
import { isString } from '@rovna-ui/utils/isString';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';

import { Paragraph } from '@rovna-internal/components/typography/Paragraph';
import { Title } from '@rovna-internal/components/typography/Title';
import { Button } from '@rovna-internal/components/primitives/Button';
import { Layout } from '@rovna-internal/components/components/Status/components/Layout';

import { NotFoundProps } from './types';
import { Big404, Content } from './styled';

export const NotFound = ({
  title,
  description,
  button,
  onClick = () => {
    window.location.reload();
  },
}: NotFoundProps) => {
  const t = useTranslation();
  const _title = isUndefined(title)
    ? t(['components', 'Status', 'NotFound', 'title'])
    : title;
  const _description = isUndefined(description)
    ? t(['components', 'Status', 'NotFound', 'description'])
    : description;

  return (
    <Layout>
      <Big404>404</Big404>
      <Content>
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
      </Content>
    </Layout>
  );
};
