import React from 'react';
import { Search as SearchIcon } from '@rovna-ui/icons/Search';

import { Input } from '@rovna-internal/components/primitives/Input';

import { SearchProps, SearchRef } from './types';

const Search = React.forwardRef<SearchRef, SearchProps>(
  ({ onSearch, onChange, ...props }, ref) => {
    const internalRef = React.useRef<SearchRef>(null);

    React.useImperativeHandle(ref, () => internalRef.current as SearchRef);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
        onSearch?.(e.target.value);
      },
      [onChange, onSearch],
    );

    React.useLayoutEffect(() => {
      const input = internalRef.current?.input;
      const root = input?.closest<HTMLElement>('[class*="-input-affix-wrapper"]');
      if (!root) return;

      const applyClearButtonName = () => {
        root
          .querySelector<HTMLElement>('[class*="-input-clear-icon"]')
          ?.setAttribute('aria-label', 'Очистить поле поиска');
      };
      const observer = new MutationObserver(applyClearButtonName);

      applyClearButtonName();
      observer.observe(root, { childList: true, subtree: true });

      return () => observer.disconnect();
    }, []);

    return (
      <Input
        ref={internalRef}
        {...props}
        aria-label={props['aria-label'] ?? props.placeholder ?? 'Поиск'}
        prefix={<SearchIcon />}
        onChange={handleChange}
      />
    );
  },
);

Search.displayName = 'Search';

export { Search };
