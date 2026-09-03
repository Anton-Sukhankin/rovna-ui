import { Any } from '@rovna-ui/types';

export const build = (path: string[], payload: Any): Any => {
  return path.reduceRight((acc, key) => ({ [key]: acc }), payload);
};
