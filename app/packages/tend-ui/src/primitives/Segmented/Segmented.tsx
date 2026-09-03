import React from 'react';
import { isNumber } from '@rovna-ui/utils/isNumber';
import { isString } from '@rovna-ui/utils/isString';

import { useTheme } from '@rovna-internal/components/theme/Theme';
import { Box } from '@rovna-internal/components/grid/Box';
import { Badge } from '@rovna-internal/components/primitives/Badge';

import { SegmentedProps, SegmentedRef } from './types';
import { Root } from './styled';

const Segmented = React.forwardRef<SegmentedRef, SegmentedProps>((props, ref) => {
  const theme = useTheme();
  const options = React.useMemo(
    () =>
      props.options.map(option => {
        if (isNumber(option) || isString(option) || !('badge' in option)) {
          return option;
        }

        const { badge } = option;

        return {
          ...option,
          label: (
            <Box as='span' $display='inline-flex' $gap={8}>
              {option.label}
              <Badge {...badge} padding='0 8px' />
            </Box>
          ),
        };
      }),
    [props.options],
  );

  return (
    <Root
      data-testid='rovna-ui-segmented'
      {...props}
      ref={ref}
      $theme={theme}
      options={options}
      size='middle'
    />
  );
});

Segmented.displayName = 'Segmented';

export { Segmented };
