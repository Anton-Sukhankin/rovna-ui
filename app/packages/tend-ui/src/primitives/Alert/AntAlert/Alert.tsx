import React from 'react';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { Sync } from '@rovna-ui/icons/Sync';
import { Close } from '@rovna-ui/icons/Close';

import { useTheme } from '@rovna-internal/components/theme/Theme';
import { Tooltip, TooltipProps } from '@rovna-internal/components/primitives/Tooltip';

import { AlertProps } from './types';
import { Footer, Root } from './styled';

const typeMap = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
  loading: undefined,
  neutral: undefined,
} as const;

/**
 * @deprecated Component has been deprecated and will be removed in next major version
 * Use "primitives/Alert" component instead
 */
const Alert = ({
  type = 'info',
  border = true,
  footer,
  closeIconTooltip,
  ...props
}: AlertProps) => {
  const theme = useTheme();
  const t = useTranslation();
  const typeProp = typeMap[type];
  const iconProp = type === 'loading' ? <Sync size={20} /> : undefined;

  const [message, description] = React.useMemo<[React.ReactNode, React.ReactNode]>(() => {
    if (!footer?.length) return [props.message, props.description];
    const extra = <Footer>{footer.map(node => node)}</Footer>;

    if (props.description) {
      return [
        props.message,
        <>
          {props.description}
          {extra}
        </>,
      ];
    }

    return [
      <>
        {props.message}
        {extra}
      </>,
      props.description,
    ];
  }, [footer, props.message, props.description]);

  const tooltipProps = React.useMemo<TooltipProps>(() => {
    if (!closeIconTooltip) return { title: t(['general', 'close']) };

    return closeIconTooltip;
  }, [closeIconTooltip, t]);

  return (
    <Root
      data-testid='rovna-ui-alert'
      {...props}
      $theme={theme}
      $type={type}
      $border={border}
      showIcon
      type={typeProp}
      icon={iconProp}
      message={message}
      description={description}
      closeIcon={
        <Tooltip {...tooltipProps}>
          <Close size={16} />
        </Tooltip>
      }
    />
  );
};

Alert.displayName = 'Alert';

export { Alert };
