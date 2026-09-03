import { createContext } from '@rovna-ui/factories';
import { Any } from '@rovna-ui/types';

import { FormModel } from '@rovna-internal/form/core';

export const [FormProvider, useFormProvider] = createContext<{
  headless: boolean;
  form: FormModel<Any>;
}>('FormProvider');
