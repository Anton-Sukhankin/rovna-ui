import { useRef } from 'react';
import { Any } from '@rovna-ui/types';

import { useEffectOnce } from '../useEffectOnce';

export const useUnmount = (fn: () => Any): void => {
  const __fn = useRef(fn);

  __fn.current = fn;

  useEffectOnce(() => () => __fn.current());
};
