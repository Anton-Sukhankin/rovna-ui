import React from 'react';
import { Form as _Form } from '@rovna-ui/components/components/Form';

import { useFiltersContext } from '../../contexts/FiltersContext';
import { useFiltersFormProvider } from '../../core/FiltersFormProvider';

const Form: React.FC = ({ children }) => {
  const { name, onFilterValuesChange } = useFiltersContext('Filters.Form');
  const model = useFiltersFormProvider('Filters.Form');

  return (
    <_Form
      data-testid='rovna-ui-filters-form'
      form={model.form}
      name={name}
      onValuesChange={onFilterValuesChange}
    >
      {children}
    </_Form>
  );
};

Form.displayName = 'Filters.Form';

export { Form };
