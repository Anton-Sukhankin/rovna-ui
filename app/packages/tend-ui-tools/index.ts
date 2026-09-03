import { ArgTypes } from '@storybook/react-vite';
import { SBType } from 'storybook/internal/types';

export const argTypes = (payload: object): ArgTypes => {
  const props: object = Object.entries(payload).map(([, v]) => v[0].props)[0];

  return Object.entries(props).reduce<ArgTypes>((result, [property, v]) => {
    const isUnstable = property.includes('UNSTABLE');
    if (isUnstable) return result;
    const primitives = ['boolean', 'string'];
    const raw = primitives.includes(v.tsType?.name) ? v.tsType?.name : `${v.tsType?.raw}`;
    const type: SBType = { name: v.tsType?.type, required: v.required };

    return {
      ...result,
      [property]: {
        description: `${v.description} \n\n \`${raw}\``,
        type,
      },
    };
  }, {});
};
