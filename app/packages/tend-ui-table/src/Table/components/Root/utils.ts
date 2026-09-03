import { GenericObject } from '@rovna-ui/types';

export const patch = (
  previous: GenericObject = {},
  next: GenericObject,
  fallback: string | undefined = undefined,
): GenericObject => {
  const final = { ...previous, ...next };
  const result = Object.entries(final).map(([key]) => {
    if (next[key]) return [key, next[key]];

    return [key, fallback];
  });
  const updated = Object.fromEntries(result);

  return updated;
};
