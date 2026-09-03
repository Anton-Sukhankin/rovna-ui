import React from 'react';

const createContext = <T extends object | null>(provider: string, initial?: T) => {
  const Context = React.createContext<T | undefined>(initial);
  const Provider = (props: T & { children: React.ReactNode }) => {
    const { children, ...context } = props;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value = React.useMemo(() => context, Object.values(context)) as T;

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };
  const useContext = (consumer: string) => {
    const context = React.useContext(Context);
    if (context) return context;
    if (initial !== undefined) return initial;
    throw new Error(`\`${consumer}\` must be used within \`${provider}\``);
  };

  Provider.displayName = `${provider}Provider`;

  return [Provider, useContext] as const;
};

export { createContext };
