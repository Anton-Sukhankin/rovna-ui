import React, { memo } from 'react';
import { Box } from '@rovna-ui/components/grid';
import { Button, Toggle } from '@rovna-ui/components/primitives';
import { Text } from '@rovna-ui/components/typography';
import { ChevronRight } from '@rovna-ui/components/icons';

type ServiceItemProps = {
  label: string;
  isEnabled: boolean;
  isPersonal: boolean;
  onClickItem(): void;
  onChangeNotificationToggle(val: boolean): void;
};

export const ServicesItem = memo(
  ({
    label,
    isEnabled,
    isPersonal,
    onClickItem,
    onChangeNotificationToggle,
  }: ServiceItemProps) => {
    return (
      <Box
        $display={'flex'}
        $justifyContent={'space-between'}
        onClick={onClickItem}
        style={{ cursor: 'pointer' }}
      >
        <Text size={'large'} fontWeight={600}>
          {label}
        </Text>
        <Box $display={'flex'} $justifyContent={'flex-end'} $alignItems={'center'}>
          {isEnabled && isPersonal && (
            <Text size={'small'} color={'gray650'} mr={14}>
              Персональные
            </Text>
          )}
          <Toggle
            size={'default'}
            checked={isEnabled}
            onClick={(state, event) => {
              event.stopPropagation();
              onChangeNotificationToggle(state);
            }}
          />
          <Button variant={'ghost'} size={'small'} before={<ChevronRight />} />
        </Box>
      </Box>
    );
  },
);
