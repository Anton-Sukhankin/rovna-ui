import { Box } from '@rovna-ui/components/grid';
import { CheckboxOptionType } from '@rovna-ui/components/primitives';
import React from 'react';

import { DeletePresetButton } from '@notifications/features/delete-preset';

type PresetFilterOptionProps = {
  data: CheckboxOptionType;
};

export const PresetFilterOption = ({ data }: PresetFilterOptionProps) => (
  <Box $display='flex' $alignItems='center' $justifyContent='space-between'>
    {data.label}
    <DeletePresetButton presetName={data.value} />
  </Box>
);
