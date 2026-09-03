import React from 'react';
import { Button, Dot } from '@rovna-ui/primitives';
import isEmpty from 'lodash/isEmpty';
import { Form } from '@rovna-ui/components/components';
import { FilterAlt } from '@rovna-ui/icons';
import dayjs from 'dayjs';

import { useTableForm } from '@rovna-internal/table/Table/hooks/useTableForm';

import { FiltersButtonProps } from './types';

type FilterValue =
  | boolean
  | string
  | number
  | dayjs.Dayjs
  | ArrayLike<unknown>
  | undefined;

const FiltersButton = ({ onClick, disabled }: FiltersButtonProps) => {
  const value = Form.useWatch<FilterValue>(['filters'], useTableForm().form);
  const hasAppliedFilters = React.useMemo(() => {
    return value ? Object.values(value).some(v => !isEmpty(v) || v === true) : false;
  }, [value]);

  return (
    <Dot
      inline={false}
      color='blue600'
      offset={[25, 10]}
      placement='leftTop'
      hidden={!hasAppliedFilters}
    >
      <Button
        type='button'
        disabled={disabled}
        before={<FilterAlt />}
        variant='secondary'
        onClick={() => {
          onClick?.();
        }}
      >
        Фильтры
      </Button>
    </Dot>
  );
};

FiltersButton.displayName = 'Table.ControlPanel.FiltersButton';

export { FiltersButton };
