import { Any } from '@rovna-ui/types';
import omit from 'lodash/omit';

export const difference = <T>(previous: Any, next: Any): T => {
  const rest = omit(previous, Object.keys(next));

  return { ...next, ...rest };
};
