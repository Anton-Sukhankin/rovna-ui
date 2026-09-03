import React from 'react';
import type {
  FormProps as AntFormProps,
  FormInstance,
  Rule,
  RuleObject,
  RuleRender,
} from 'antd-core/es/form';

type BaseFormProps = {
  gap?: number;
};

type FormProps<T = unknown> = AntFormProps<T> & BaseFormProps;
type FormRef<T = unknown> = FormInstance<T>;
type FormRuleObject = RuleObject;
type FormValidator = NonNullable<RuleObject['validator']>;
type FormRule = Rule;
type FormRuleRender = RuleRender;
type FormComponent = (<T = unknown>(
  props: FormProps<T> & { ref?: React.ForwardedRef<FormRef<T>> },
) => React.JSX.Element) & {
  displayName?: string;
};

export type {
  FormComponent,
  FormProps,
  FormRef,
  FormInstance,
  FormRuleObject,
  FormValidator,
  FormRule,
  FormRuleRender,
};
