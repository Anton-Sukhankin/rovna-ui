import React from 'react';

export function contextFactory<T>(provider = 'Context', initial?: T) {
  const Context = React.createContext<T | undefined>(initial);

  function useContext(consumer = 'useContext') {
    const context = React.useContext(Context);
    if (context) return context;

    throw new Error(`\`${consumer}\` must be used within \`${provider}\`!`);
  }

  Context.displayName = provider;

  return [Context.Provider, useContext] as const;
}
