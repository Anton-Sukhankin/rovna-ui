import React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';

import { useTheme } from '@rovna-internal/components/theme/Theme';
import { Text } from '@rovna-internal/components/typography/Text';
import { Box } from '@rovna-internal/components/grid/Box';
import { Button } from '@rovna-internal/components/primitives/Button';
import { Badge, BadgeProps } from '@rovna-internal/components/primitives/Badge';

import { Extra, Root } from './styled';
import { ActionsProps, ActionsRef } from './types';

const BaseActions = (
  {
    visible,
    counter,
    counterText,
    okText,
    cancelText,
    okButtonProps,
    cancelButtonProps,
    onOk,
    onCancel,
    extra,
    offset,
    ...props
  }: ActionsProps,
  ref: React.ForwardedRef<ActionsRef>,
) => {
  const t = useTranslation();
  const theme = useTheme();
  const isVisible = (() => {
    if (typeof visible === 'boolean') return visible;
    if (typeof counter === 'object')
      return typeof counter.inner === 'number' && counter.inner > 0;

    return typeof counter === 'number' && counter > 0;
  })();
  const extraNode = React.useMemo(() => {
    if (!extra) {
      return (
        <Box $display='inline-flex' $alignItems='center' $gap={12}>
          <Button
            data-testid='rovna-ui-actions-cancel-button'
            variant='secondary'
            {...cancelButtonProps}
            onClick={cancelButtonProps?.onClick ?? onCancel}
          >
            {cancelButtonProps?.children ||
              cancelText ||
              t(['primitives', 'Actions', 'cancel'])}
          </Button>
          <Button
            data-testid='rovna-ui-actions-ok-button'
            {...okButtonProps}
            onClick={okButtonProps?.onClick ?? onOk}
          >
            {okButtonProps?.children || okText || t(['primitives', 'Actions', 'accept'])}
          </Button>
        </Box>
      );
    }

    if (Array.isArray(extra))
      return (
        <Box $display='inline-flex' $alignItems='center' $gap={12}>
          {extra.map(node => node)}
        </Box>
      );

    return extra;
  }, [cancelButtonProps, cancelText, extra, okButtonProps, okText, onCancel, onOk, t]);

  const badgeProps = React.useMemo<BadgeProps>(() => {
    if (typeof counter === 'object') return { preset: 'blue', ...counter };

    return { preset: 'blue', inner: counter };
  }, [counter]);

  return ReactDOM.createPortal(
    <Root
      data-testid='rovna-ui-actions'
      {...props}
      ref={ref}
      theme={theme}
      $visible={isVisible}
      $offset={offset}
    >
      <Box $display='flex' $alignItems='center' $gap={4}>
        <Text size='large' strong>
          {counterText ?? t(['primitives', 'Actions', 'selected'])}
        </Text>
        <Badge {...badgeProps} />
      </Box>
      <Extra>{extraNode}</Extra>
    </Root>,
    document.body,
  );
};

const Actions = React.forwardRef<ActionsRef, ActionsProps>(BaseActions);

Actions.displayName = 'Actions';

export { Actions };
