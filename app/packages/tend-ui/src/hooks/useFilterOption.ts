import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Option = any;
export type FilterOption = (search: string, option?: Option) => boolean;

export const useFilterOption = <T>(props: {
  search: string;
  options: T[];
  filterOption: boolean | FilterOption;
  filterOptionProp: string;
}) => {
  const { filterOptionProp, search, options, filterOption } = props;

  return React.useMemo(() => {
    if (!search || filterOption === false) return options;
    const isPredicate = typeof filterOption === 'function';

    const fn = isPredicate
      ? filterOption
      : (search: string, option?: Option) => {
          return option[filterOptionProp]
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase());
        };

    return options.filter(option => fn(search, option));
  }, [filterOption, filterOptionProp, options, search]);
};
