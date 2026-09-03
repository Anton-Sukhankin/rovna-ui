import React from 'react';
import { Form } from '@rovna-ui/components/components';
import { Box } from '@rovna-ui/grid';

import { INTERNAL_FilterPicker as FilterPicker } from '@rovna-internal/filters/FilterPicker';
import { EXPERIMENTAL_useFilters as useFilters } from '@rovna-internal/filters/core/useFilters';
import { createReactKey } from '@rovna-internal/filters/utils';

import { HotFiltersProps } from './types';

/**
 * @description Горячие фильтры
 */
const HotFilters = (props: HotFiltersProps) => {
  const filters = useFilters(props);
  const { layout = 'horizontal', ...rest } = props;
  const flexDirection = layout === 'vertical' ? 'column' : 'row';

  return (
    <Box
      data-testid='rovna-ui-hot-filters'
      className='rovna-ui-hot-filters-root'
      $display='flex'
      $alignItems='center'
      $flexDirection={flexDirection}
      $flexWrap={layout === 'horizontal' ? 'wrap' : undefined}
      $width='100%'
      $gap={12}
    >
      <Form
        component={false}
        name={rest.name}
        form={filters.getAntdFormInstance()}
        onValuesChange={filters.getAntdFormValuesChangeHandler()}
      >
        {filters.getFilters().map(filter => (
          <Box
            className='rovna-ui-hot-filters-filter'
            $display='flex'
            $alignItems='center'
            $flexShrink={0}
            $maxWidth='100%'
            $width='auto'
            key={createReactKey(filter.__filter)}
          >
            <Form.Item
              noStyle
              name={filter.getName()}
              valuePropName={filter.getValuePropName()}
            >
              <FilterPicker {...filter.INTERNAL_getComponentProps()} />
            </Form.Item>
          </Box>
        ))}
      </Form>
    </Box>
  );
};

HotFilters.displayName = 'HotFilters';

export { HotFilters };
