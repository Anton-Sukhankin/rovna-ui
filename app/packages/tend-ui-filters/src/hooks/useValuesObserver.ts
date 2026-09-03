import { Form, FormInstance } from '@rovna-ui/components/components/Form';
import { GenericObject } from '@rovna-ui/components/types';

export const useValuesObserver = <T extends GenericObject = GenericObject>(
  name: string,
  form: FormInstance<T>,
  scope?: string,
) => {
  const values = Form.useWatch(values => {
    // Предполагаем, что когда мы используем фильтр вместе с таблицей
    // нужно извлекать значения из формы под scope потому что name будет приходить
    // массивного типа
    // FIXME: Придумать более универсальное решение, тут нарушается архитектурная составляющая подхода
    if (Array.isArray(name) && name.length > 1) {
      const scope = name[0];

      return values[scope];
    }

    if (scope) return values[scope];

    return values;
  }, form);

  return values;
};
