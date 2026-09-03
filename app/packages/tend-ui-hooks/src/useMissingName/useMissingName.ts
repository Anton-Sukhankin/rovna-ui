import React from 'react';

const useMissingName = (names: string[], mask: string) => {
  return React.useMemo(() => {
    const regexp = new RegExp(`${mask} (\\d+)`);
    const numbers = names
      .map(name => name.match(regexp))
      .filter((value): value is RegExpMatchArray => Boolean(value))
      .map(([, matched]) => parseInt(matched, 10))
      .sort((a, b) => a - b);

    const missing = Array.from({ length: numbers.length + 1 }, (_, i) => i + 1).find(
      n => !numbers.includes(n),
    );

    return `${mask} ${missing}`;
  }, [mask, names]);
};

export { useMissingName as INTERNAL_useMissingName };
