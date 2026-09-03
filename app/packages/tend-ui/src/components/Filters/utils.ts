import { extract as _extract } from '@rovna-ui/utils/extract';

export const pack = <T extends object>(payload: T, scope?: string): T => {
  if (scope) return { [scope]: payload } as T;

  return payload;
};

export const extract = <T extends object>(payload: T, scope?: string): T => {
  if (scope) return _extract(payload, [scope]) || {};

  return payload;
};
