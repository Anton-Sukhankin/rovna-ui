import React from 'react';
import AntForm from 'antd-core/es/form';
import type { ValidateStatus } from 'antd-core/es/form/FormItem';
import { Help } from '@rovna-ui/icons/Help';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { Root } from './styled';
import { useErrorMessagePrefix } from './hooks';
import { ItemProps } from './types';

type FieldControlBridgeProps = Record<string, unknown> & {
  child: React.ReactElement<Record<string, unknown>>;
};

type FormItemStatus = {
  status?: ValidateStatus;
  errors: React.ReactNode[];
  warnings: React.ReactNode[];
};

const ariaRequiredControls = new Set(['Checkbox', 'Input', 'InputNumber', 'TextArea']);

const supportsAriaRequired = (element: React.ReactElement) => {
  const displayName =
    typeof element.type === 'string'
      ? element.type
      : (element.type as { displayName?: string }).displayName;

  return displayName
    ? ['input', 'select', 'textarea'].includes(displayName) ||
        ariaRequiredControls.has(displayName)
    : false;
};

const FieldControlBridge = ({
  child,
  'aria-required': _ariaRequired,
  ...props
}: FieldControlBridgeProps) => React.cloneElement(child, props);

const BaseItem = <T = unknown,>({ children, width, ...props }: ItemProps<T>) => {
  const theme = useTheme();
  const rules = useErrorMessagePrefix(props.rules);
  const tooltip = React.useMemo(() => {
    if (!props.tooltip) return;

    const icon =
      typeof props.tooltip.children === 'undefined' ? (
        <Help data-testid='help-icon' />
      ) : (
        props.tooltip.children
      );

    const overlayInnerStyle = props.tooltip.lineBreak
      ? { ...props.tooltip.overlayInnerStyle, whiteSpace: 'pre-line' }
      : undefined;

    return { icon, ...props.tooltip, overlayInnerStyle };
  }, [props.tooltip]);
  const control =
    React.isValidElement<Record<string, unknown>>(children) && !supportsAriaRequired(children) ? (
      <FieldControlBridge child={children} />
    ) : (
      children
    );

  return (
    <Root<T> {...props} $theme={theme} $width={width} rules={rules} tooltip={tooltip}>
      {control}
    </Root>
  );
};

const Item = Object.assign(BaseItem, {
  displayName: 'Form.Item',
  useStatus: AntForm.Item.useStatus as () => FormItemStatus,
});

export { Item };
