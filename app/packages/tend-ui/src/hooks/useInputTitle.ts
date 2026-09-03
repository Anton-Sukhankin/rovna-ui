import React from 'react';

type Options<T> = {
  title?: string;
  onChange?: (e: React.ChangeEvent<T>) => void;
};

/**
 * @deprecated Используйте `useInputTitle` из `@rovna-ui/primitives`
 */
export const useInputTitle = <T extends HTMLInputElement | HTMLTextAreaElement>({
  title = '',
  onChange,
}: Options<T>) => {
  const [_title, _setTitle] = React.useState(title);
  const bind = React.useMemo(
    () => ({
      title: _title,
      onChange: (e: React.ChangeEvent<T>) => {
        _setTitle(e.target.value);
        onChange?.(e);
      },
    }),
    [_title, onChange],
  );

  return bind;
};
