import React from 'react';
import { Text, Title as _Title } from '@rovna-ui/typography';
import { Box } from '@rovna-ui/grid';

import { Button } from '@rovna-internal/primitives/Button/Button';

import { EmptyProps } from './types';
import { Error, Filter, Loading, New, Success } from './components';
import { Root as _Root } from './styled';

const Root = ({ children }: { children?: React.ReactNode }) => {
  return (
    <_Root data-testid='rovna-ui-empty' className='rovna-ui-empty-root'>
      {children}
    </_Root>
  );
};

Root.displayName = 'Empty.Root';

const Title = ({ children }: { children?: React.ReactNode }) => {
  return (
    <_Title level='h6' margin={0}>
      {children}
    </_Title>
  );
};
Title.displayName = 'Empty.Title';

const Description = ({ children }: { children?: React.ReactNode }) => {
  return <Text color='gray650'>{children}</Text>;
};
Description.displayName = 'Empty.Description';

const Empty = ({
  size = 'medium',
  variant = 'empty',
  title,
  description,
  buttons,
}: EmptyProps) => {
  const Image = {
    empty: New,
    ['no-results']: Filter,
    error: Error,
    success: Success,
    loading: Loading,
  }[variant];

  const mappedButtons = React.useMemo<EmptyProps['buttons']>(() => {
    if (size === 'xs') return buttons?.map(button => ({ ...button, size: 'small' }));

    return buttons;
  }, [buttons, size]);

  return (
    <Root>
      <Box className='rovna-ui-empty-header'>
        <Image size={size} />
      </Box>
      {(title || description) && (
        <Box
          $display='flex'
          $flexDirection='column'
          $alignItems='center'
          $gap={4}
          className='rovna-ui-empty-body'
        >
          {title && <Title>{title}</Title>}
          {description && <Description>{description}</Description>}
        </Box>
      )}
      {mappedButtons && (
        <Box className='rovna-ui-empty-footer' $display='flex' $gap={8}>
          {mappedButtons.map((button, index) => (
            <Button key={button.key ?? index} {...button} />
          ))}
        </Box>
      )}
    </Root>
  );
};

Empty.displayName = 'Empty';

export { Empty };
