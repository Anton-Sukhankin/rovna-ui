import React from 'react';

import { Button } from '@rovna-internal/components/primitives/Button';

import { Box } from '../../styled';
import { DialogMethodProps } from '../../types';

type FooterProps = DialogMethodProps & {
  destroy: () => void;
  padding?: string;
};

export const Footer = (props: FooterProps) => {
  const [loading, setLoading] = React.useState(false);

  const handleCancelClick = React.useCallback(() => {
    const onCancelReturnValue = props.onCancel?.();

    if (onCancelReturnValue instanceof Promise === false) {
      props.destroy();

      return;
    }

    setLoading(true);
    onCancelReturnValue
      .then(() => {
        props.destroy();
      })
      .catch(() => {
        console.log('[Dialog]: Error');
      })
      .finally(() => {
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onCancel, props.destroy]);

  const handleOkClick = React.useCallback(() => {
    if (!props.onOk) {
      props.destroy();

      return;
    }

    const onOkReturnValue = props.onOk?.();

    if (onOkReturnValue instanceof Promise === false) {
      props.destroy();

      return;
    }

    setLoading(true);
    onOkReturnValue
      .then(() => {
        props.destroy();
      })
      .catch(() => {
        console.log('[Dialog]: Error');
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onOk, props.destroy]);

  if (typeof props.footer === 'undefined')
    return (
      <Box
        $display='flex'
        $justifyContent='flex-end'
        $alignItems='center'
        $gap={12}
        $margin='24px 0 0'
        $padding={props.padding}
      >
        <Button
          data-testid='rovna-ui-dialog-cancel-button'
          variant='link'
          loading={loading}
          {...props.cancelButtonProps}
          onClick={props.cancelButtonProps?.onClick ?? handleCancelClick}
        >
          {props.cancelButtonProps?.children || props.cancelText}
        </Button>
        <Button
          data-testid='rovna-ui-dialog-ok-button'
          loading={loading}
          {...props.okButtonProps}
          onClick={props.okButtonProps?.onClick ?? handleOkClick}
        >
          {props.okButtonProps?.children || props.okText}
        </Button>
      </Box>
    );

  if (Array.isArray(props.footer))
    return (
      <Box
        $display='flex'
        $alignItems='center'
        $justifyContent='flex-end'
        $gap={12}
        $margin='24px 0 0'
        $padding={props.padding}
      >
        {props.footer.map(node => node)}
      </Box>
    );

  if (!props.footer) return <>{props.footer}</>;

  return (
    <Box $margin='24px 0 0' $padding={props.padding}>
      {props.footer}
    </Box>
  );
};
