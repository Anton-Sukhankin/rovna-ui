import React from 'react';
import { extractDimensionProps, extractMarginProps } from '@rovna-ui/styling';
import { Search as SearchIcon } from '@rovna-ui/icons/Search';

import { useTheme } from '@rovna-internal/components/theme/Theme';
import { useAllowClear } from '@rovna-internal/components/hooks/useAllowClear';
import { useInputTitle } from '@rovna-internal/components/hooks/useInputTitle';
import { useSize } from '@rovna-internal/components/hooks/useSize';

import { Root } from './styled';
import { SearchProps, SearchRef } from './types';

const Search = React.forwardRef<SearchRef, SearchProps>(
  ({ allowClear, clearIconTooltip, ...props }, ref) => {
    const theme = useTheme();
    const allowClearProp = useAllowClear({ allowClear, clearIconTooltip });
    const { onChange, title } = useInputTitle(props);
    const size = useSize(props.size);
    const { rest: withoutMargins, ...margins } = extractMarginProps(props);
    const { rest, ...dimensions } = extractDimensionProps(withoutMargins);

    return (
      <Root
        data-testid='rovna-ui-search'
        {...rest}
        {...margins}
        {...dimensions}
        ref={ref}
        onChange={onChange}
        title={title}
        $theme={theme}
        prefix={<SearchIcon />}
        allowClear={allowClearProp}
        size={size}
      />
    );
  },
);

Search.displayName = 'Search';

export { Search };
