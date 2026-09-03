import React from 'react';
import cn from 'classnames';
import { useTheme } from '@rovna-ui/theme';

import { Root } from './styled';
import { QuoteProps, QuoteRef } from './types';

const Quote = React.forwardRef<QuoteRef, QuoteProps>(({ className, ...props }, ref) => {
  const theme = useTheme();

  return (
    <Root
      data-testid='rovna-ui-quote'
      {...props}
      ref={ref}
      theme={theme}
      className={cn(['rovna-ui-typography-quote', className])}
    />
  );
});

Quote.displayName = 'Quote';

export { Quote };
