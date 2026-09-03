import React from 'react';
import { Any } from '@rovna-ui/types';
import { Form, Tooltip } from '@rovna-ui/primitives';
import { Help } from '@rovna-ui/icons';
import { isObject } from '@rovna-ui/utils';

import { useWatch } from '@rovna-internal/form/hooks/useWatch';
import { useFormProvider } from '@rovna-internal/form/contexts';
import { useValidationResult } from '@rovna-internal/form/hooks/useValidationResult';
import { useRequires } from '@rovna-internal/form/hooks/useRequires';

import { FieldProps } from './types';

const defaultNormalize = (payload: Any) => payload;
const defaultGetValueFromEvent = (payload: Any, ...args: Any[]) => {
  const name = args[0];
  if (
    isObject(payload) &&
    'target' in payload &&
    isObject(payload.target) &&
    name in payload.target
  ) {
    const k = name as keyof typeof payload.target;

    return payload.target[k];
  }

  return payload;
};
const defaultGetLabelRender = (label: string) => label;
const defaultGetMessageRender = (message: string) => message;
const style = { cursor: 'help' };
const ariaRequiredControls = new Set(['Checkbox', 'Input', 'InputNumber', 'TextArea']);

const getComponentDisplayName = (element: React.ReactElement) =>
  typeof element.type === 'string'
    ? element.type
    : (element.type as { displayName?: string }).displayName;

const supportsAriaRequired = (element: React.ReactElement) => {
  const displayName = getComponentDisplayName(element);

  return displayName
    ? ['input', 'select', 'textarea'].includes(displayName) ||
        ariaRequiredControls.has(displayName)
    : false;
};

const Field = <V = Any, R = Any>({
  disabled = false,
  handlerPropName = 'onChange',
  valuePropName = 'value',
  name = '',
  children,
  normalize = defaultNormalize,
  getValueFromEvent,
  getLabelRender = defaultGetLabelRender,
  getMessageRender = defaultGetMessageRender,
  label,
  rules,
  requires,
  tooltip,
}: FieldProps<V, R>) => {
  const context = useFormProvider('Form.Field');
  const id = Array.isArray(name) ? name.join('_') : name;
  const value = useWatch(context.form, name);
  const normalized = normalize(value);
  const isDisabled = useRequires(context.form, requires);
  const validation = useValidationResult(context.form, name);
  const _getValueFromEvent = React.useCallback(
    (payload: V) => {
      if (getValueFromEvent) return getValueFromEvent(payload);

      return defaultGetValueFromEvent(payload, valuePropName);
    },
    [getValueFromEvent, valuePropName],
  );
  const onChange = React.useCallback(
    (payload: V) => {
      const extracted = _getValueFromEvent(payload);
      context.form.__setField(name, extracted);
    },
    [context.form, _getValueFromEvent, name],
  );
  React.useEffect(() => {
    context.form.__setRules(name, rules || []);

    return () => {
      context.form.__setRules(name, []);
    };
  }, [context.form, name, rules]);

  const __disabled = [isDisabled, disabled].some(Boolean);
  const required = rules?.some(r => r.required);
  const isError = validation?.status === 'error';
  const isWarning = validation?.status === 'warning';
  const status = (() => {
    if (validation?.status === 'error' || validation?.status === 'warning')
      return validation?.status;

    return undefined;
  })();

  const childAccessibilityProps: Record<string, string | boolean | undefined> = {
    'aria-invalid': isError ? 'true' : undefined,
    'aria-required': required && supportsAriaRequired(children) ? true : undefined,
  };
  const childProps = children.props as Record<string, unknown>;

  if (
    context.headless &&
    label &&
    !childProps['aria-label'] &&
    !childProps['aria-labelledby']
  ) {
    childAccessibilityProps['aria-label'] = label;
  }

  const child = React.cloneElement(children, {
    [valuePropName]: normalized,
    [handlerPropName]: onChange,
    id,
    disabled: __disabled,
    status: isError ? 'error' : isWarning ? 'warning' : undefined,
    ...childAccessibilityProps,
  });

  return context.headless ? (
    child
  ) : (
    <Form.Field status={status}>
      {label && (
        <Form.Label htmlFor={id} required={required}>
          {getLabelRender(label)}
          {tooltip && (
            <Tooltip {...tooltip}>
              <Help style={style} />
            </Tooltip>
          )}
        </Form.Label>
      )}
      {child}
      {(isError || isWarning) && (
        <Form.Message>{getMessageRender(validation.message ?? '')}</Form.Message>
      )}
    </Form.Field>
  );
};

Field.displayName = 'Form.Field';

export { Field };
