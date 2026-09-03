import React from 'react';
import { extractMarginProps, extractPaddingProps } from '@rovna-ui/styling';

import { FlexProps, FlexRef } from './types';
import { Root } from './styled';

const Flex = React.forwardRef<FlexRef, FlexProps>((props, ref) => {
  const { rest: withoutMargins, ...margins } = extractMarginProps(props);
  const { rest, ...paddings } = extractPaddingProps(withoutMargins);

  return <Root {...rest} ref={ref} {...margins} {...paddings} />;
});

Flex.displayName = 'Flex';

export { Flex };
