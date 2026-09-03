import { useEffect } from 'react';
import { LiteralUnion } from '@rovna-ui/types';

import { KeyboardKey } from './types';

export const useKeyPress = (
  key: LiteralUnion<KeyboardKey>,
  onPress: (event: KeyboardEvent) => void,
) => {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key !== key) return;
      onPress(event);
    };

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [key, onPress]);
};
