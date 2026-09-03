import React, { useCallback, useMemo } from 'react';
import { Text } from '@rovna-ui/typography';
import { useTheme } from '@rovna-ui/theme';
import { Box } from '@rovna-ui/grid/Box';

import { Steps } from './styled';
import { ProcessStepTypes, StepsHistoryApprovalProps } from './types';
import { stepIcon } from './utils';
import { ApprovalsGroupList, ApprovalsList, StepContent, StepTitle } from './components';

const StepsHistoryApproval = ({
  currentStepTitle,
  currentApprovalUsers,
  currentApprovalGroups,
  items,
  showAvatar = true,
  direction = 'vertical',
  current,
  onChange,
  ...props
}: StepsHistoryApprovalProps) => {
  const theme = useTheme();

  const handleChange = useCallback(
    (newCurrent: number) => {
      onChange?.(newCurrent);
    },
    [onChange],
  );

  const getCurrentStepItem = useCallback(
    () => ({
      title: (
        <Text mb={8} color='gray900' size='large'>
          {currentStepTitle ?? 'Текущий шаг'}
        </Text>
      ),
      description: (
        <Box>
          {currentApprovalUsers && (
            <ApprovalsList list={currentApprovalUsers} showAvatar={showAvatar} />
          )}
          {currentApprovalGroups && (
            <ApprovalsGroupList list={currentApprovalGroups} showAvatar={showAvatar} />
          )}
        </Box>
      ),
      icon: stepIcon('medium')[ProcessStepTypes.ACTIVE],
    }),
    [currentApprovalUsers, currentApprovalGroups, currentStepTitle, showAvatar],
  );

  const getFutureStepItem = useCallback(
    () => ({
      icon: stepIcon('medium')[ProcessStepTypes.FUTURE],
    }),
    [],
  );

  const getIcon = useCallback(
    item => (item.step?.stepType ? stepIcon('medium')[item.step.stepType] : null),
    [],
  );

  const customItems = useMemo(() => {
    const baseItems = items.map((item, index) => {
      const isFinishOrCancelItem =
        item.step?.stepType !== ProcessStepTypes.FINISH &&
        item.step?.stepType !== ProcessStepTypes.CANCEL;
      const isShouldRenderCancelIcon =
        items.length - 1 !== index &&
        items[index + 1].step?.stepType === ProcessStepTypes.CANCEL;

      if (isShouldRenderCancelIcon) {
        return {
          title: (
            <StepTitle
              stepType={item.step?.stepType}
              title={item.title}
              subTitle={item.subTitle}
              created={item.created}
            />
          ),
          description:
            isFinishOrCancelItem &&
            (item.description ?? <StepContent step={item} showAvatar={showAvatar} />),
          icon: stepIcon('medium')[ProcessStepTypes.CANCEL],
        };
      }

      return {
        title: (
          <StepTitle
            stepType={item.step?.stepType}
            title={item.title}
            subTitle={item.subTitle}
            created={item.created}
          />
        ),
        description:
          isFinishOrCancelItem &&
          (item.description ?? <StepContent step={item} showAvatar={showAvatar} />),
        icon: getIcon(item),
      };
    });

    const lastItem = items[items.length - 1];

    if (
      lastItem.step?.stepType !== ProcessStepTypes.FINISH &&
      lastItem.step?.stepType !== ProcessStepTypes.CANCEL
    ) {
      return [...baseItems, getCurrentStepItem(), getFutureStepItem()];
    }

    return baseItems;
  }, [getCurrentStepItem, getFutureStepItem, getIcon, items, showAvatar]);

  return (
    <Steps
      direction={direction}
      size='default'
      $theme={theme}
      items={customItems}
      onChange={onChange ? handleChange : undefined}
      current={current}
      {...props}
    />
  );
};

StepsHistoryApproval.displayName = 'StepsHistoryApproval';

export { StepsHistoryApproval };
