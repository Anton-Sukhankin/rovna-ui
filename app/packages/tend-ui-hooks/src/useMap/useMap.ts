import React from 'react';

export const useMap = () => {
  const map = React.useRef(new Map<string, unknown>());

  const set = React.useCallback(<D = unknown>(key: string, value: D) => {
    map.current.set(key, value);

    return value;
  }, []);
  const get = React.useCallback(<D = unknown>(key: string): D => {
    const value = map.current.get(key);

    return value as D;
  }, []);
  const del = React.useCallback((key: string) => {
    const value = map.current.get(key);
    map.current.delete(key);

    return value;
  }, []);
  const has = React.useCallback((key: string) => {
    return map.current.has(key);
  }, []);
  const clear = React.useCallback(() => {
    map.current.clear();
  }, []);

  return {
    set,
    get,
    del,
    has,
    clear,
  };
};
