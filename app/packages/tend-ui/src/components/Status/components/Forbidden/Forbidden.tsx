import React from 'react';
import { isUndefined } from '@rovna-ui/utils/isUndefined';
import { isString } from '@rovna-ui/utils/isString';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';

import { Box } from '@rovna-internal/components/grid/Box';
import { Title } from '@rovna-internal/components/typography/Title';
import { Paragraph } from '@rovna-internal/components/typography/Paragraph';
import { Text } from '@rovna-internal/components/typography/Text';
import { Link } from '@rovna-internal/components/typography/Link';
import { Button } from '@rovna-internal/components/primitives/Button';
import { Layout } from '@rovna-internal/components/components/Status/components/Layout';
import { WhaleSad } from '@rovna-internal/components/components/Status/WhaleSad';

import { ForbiddenProps } from './types';

export const Forbidden = ({
  title,
  description,
  onClick = () => {
    window.location.replace('/');
  },
  button,
  content,
}: ForbiddenProps) => {
  const t = useTranslation();
  const _title = isUndefined(title)
    ? t(['components', 'Status', 'Forbidden', 'title'])
    : title;
  const _description = isUndefined(description)
    ? t(['components', 'Status', 'Forbidden', 'description'])
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
        {isUndefined(content) ? (
          <>
            <Box $display='flex' $flexDirection='column'>
              <Text>
                {t(['components', 'Status', 'phone'])}:&nbsp;
                <Link href='tel:+7-495-660-41-41'>+7-495-660-41-41</Link>
              </Text>
            </Box>
            <Text size='small' color='gray650'>
              {t(['components', 'Status', 'schedule'])}
            </Text>
          </>
        ) : (
          content
        )}

        <Button onClick={onClick} {...button}>
          {button?.children ?? t(['components', 'Status', 'button'])}
        </Button>
      </Box>
    </Layout>
  );
};
