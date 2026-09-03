import React from 'react';
import { colors } from '@rovna-ui/tokens/samolet';

export const Version: React.FC = ({ children }) => {
  return (
    <span
      style={{
        fontSize: '16px',
        color: 'white',
        background: colors.blue600,
        padding: '0 8px',
        borderRadius: '4px',
      }}
    >
      v{children}
    </span>
  );
};
