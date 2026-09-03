import React from 'react';
import AntForm, { Rule, RuleObject } from 'antd-core/es/form';
import { Error } from '@rovna-ui/icons/Error';

const composeMessage = (rule: RuleObject) => ({
  ...rule,
  message: (
    <>
      <Error data-testid='error-icon' size={16} /> {rule.message}
    </>
  ),
});

export const useErrorMessagePrefix = (rules?: Rule[]) => {
  const form = AntForm.useFormInstance();

  return React.useMemo(() => {
    return rules?.map(rule => {
      if (typeof rule === 'function') {
        return composeMessage(rule(form));
      }

      return composeMessage(rule);
    });
  }, [form, rules]);
};
