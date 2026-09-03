import React from 'react';

import { useTheme } from '@rovna-internal/components/theme/Theme';
import { Box } from '@rovna-internal/components/grid/Box';

import { Root } from './styled';
import { StepsProps } from './types';
import { StepsHistoryApproval } from '../StepsHistoryApproval';
import { StepsCustom } from './StepsCustom';
import { isHistoryStepper } from '../StepsHistoryApproval/utils';

const Steps = ({
  labelPlacement = 'vertical',
  direction = 'horizontal',
  variant = 'large',
  ...props
}: StepsProps) => {
  const theme = useTheme();
  const [innerCurrent, setInnerCurrent] = React.useState(0);
  const children = props.items?.[props?.current ?? innerCurrent].children;
  const current = props.current ?? innerCurrent;
  const handleChange = React.useCallback(
    (current: number) => {
      setInnerCurrent(current);
      props.onChange?.(current);
    },
    [props],
  );

  const mt = {
    horizontal: '16px',
    vertical: undefined,
  }[direction];
  const flexDirection = {
    horizontal: 'column',
    vertical: 'row',
  }[direction] as React.CSSProperties['flexDirection'];

  if (variant === 'medium' || variant === 'small') {
    if (!isHistoryStepper(props.current))
      return <StepsCustom {...props} direction={direction} variant={variant} />;
    if (isHistoryStepper(props.current)) return <StepsHistoryApproval {...props} />;
  }

  return (
    <Box $display='flex' $flexDirection={flexDirection}>
      <Root
        data-testid='rovna-ui-steps'
        {...props}
        $theme={theme}
        direction={direction}
        labelPlacement={labelPlacement}
        current={current}
        onChange={handleChange}
      />
      {children && (
        <Box $width='100%' $mt={mt}>
          {children}
        </Box>
      )}
    </Box>
  );
};

Steps.displayName = 'Steps';

export { Steps };
