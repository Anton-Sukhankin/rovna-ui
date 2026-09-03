import React from 'react';

/**
 * @deprecated
 * Используйте просто `Table.Header`
 *
 * @example
 * ```
 * <Table.Root>
 *  ...
 *  <Table.Header>
 *    ...
 *  </Table.Header>
 *  ...
 * </Table.Root>
 * ```
 */
const Root: React.FC = ({ children }) => {
  return <>{children}</>;
};

Root.displayName = 'Table.Header.Root';

export { Root };
