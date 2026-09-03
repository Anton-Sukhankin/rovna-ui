import React, { useCallback, useMemo } from 'react';
import { StepProps, Tooltip } from 'antd-core';
import { Text } from '@rovna-ui/typography';
import { isString } from '@rovna-ui/utils';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { Steps } from './StepsCustom.styled';
import { StepsProps } from './types';
import { ApprovalProcessStep, ProcessStepTypes } from '../StepsHistoryApproval/types';
import { ICON_CONTAINER_SIZE, stepIcon } from '../StepsHistoryApproval/utils';

export const StepsCustom = ({
  items,
  direction = 'horizontal',
  current = 0,
  onChange,
  variant = 'medium',
  ...props
}: StepsProps) => {
  const theme = useTheme();

  const handleChange = useCallback(
    (newCurrent: number) => {
      onChange?.(newCurrent);
    },
    [onChange],
  );

  const getIcon = useCallback(
    (item, index) => {
      if (current > index) return stepIcon(variant).start;
      if (current === index) return stepIcon(variant).active;

      return item.step?.stepType ? stepIcon(variant)[item.step.stepType] : null;
    },
    [current, variant],
  );

  const customItems = useMemo(() => {
    const baseItems = items.map((item: StepProps & ApprovalProcessStep, index) => {
      const isNonFinishOrCancelItem =
        item.step?.stepType !== ProcessStepTypes.FINISH &&
        item.step?.stepType !== ProcessStepTypes.CANCEL;

      return {
        title: isString(item.title) ? (
          <Tooltip title={item.title}>
            <Text
              ellipsis
              color={item.step?.stepType === 'cancel' ? 'gray900' : 'gray650'}
              size={['medium', 'large'].includes(variant) ? 'large' : variant}
            >
              {item.title}
            </Text>
          </Tooltip>
        ) : (
          item.title
        ),
        description: isNonFinishOrCancelItem && (
          <Text ellipsis color='gray400' size='small'>
            {item.description}
          </Text>
        ),
        icon: getIcon(item, index),
      };
    });

    return baseItems;
  }, [getIcon, items, variant]);

  return (
    <Steps
      direction={direction}
      size='default'
      $theme={theme}
      items={customItems}
      current={current}
      onChange={handleChange}
      variant={ICON_CONTAINER_SIZE[variant]}
      {...props}
    />
  );
};

StepsCustom.displayName = 'StepsCustom';
