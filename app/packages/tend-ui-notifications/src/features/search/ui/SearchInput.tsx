import { Input } from '@rovna-ui/components/primitives';
import { Search } from '@rovna-ui/components/icons';
import React, { useEffect, useState } from 'react';

import {
  useNotificationsSearch,
  useNotificationsSetSearch,
} from '@notifications/app/store/hooks';
import { useDebounce } from '@notifications/shared/hooks';

export const SearchInput = () => {
  const search = useNotificationsSearch();
  const setSearch = useNotificationsSetSearch();

  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  return (
    <Input
      allowClear
      placeholder='Поиск'
      prefix={<Search />}
      size='medium'
      value={searchInput}
      onChange={e => setSearchInput(e.target.value)}
    />
  );
};
