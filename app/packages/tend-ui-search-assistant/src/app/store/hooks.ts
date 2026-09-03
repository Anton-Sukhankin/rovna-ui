// @ts-expect-error module
import { useStoreon } from 'storeon/react';

import { Events, State } from '.';

export const useStore = (...keys: (keyof State)[]) => useStoreon<State, Events>(...keys);
