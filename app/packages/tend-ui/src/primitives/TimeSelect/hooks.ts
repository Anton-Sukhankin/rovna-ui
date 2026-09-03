import React from 'react';

const MINUTE_STEP = 30;
const HOUR_STEP = 1;
const FROM = 0;
const TO = 24;

type Options = {
  from?: number;
  to?: number;
  step?: {
    hour?: number;
    minute?: number;
  };
};

export const useTimeOptions = (options?: Options) => {
  const { from = FROM, to = TO } = options || {};
  const hourStep = options?.step?.hour ?? HOUR_STEP;
  const minuteStep = options?.step?.minute ?? MINUTE_STEP;

  return React.useMemo(
    () =>
      Array.from(
        { length: (to - from) / hourStep },
        (_, index) => from + index * hourStep,
      )
        .reduce<number[][]>((acc, hour) => {
          Array.from(
            { length: 60 / minuteStep },
            (_, index) => index * minuteStep,
          ).forEach(minute => {
            acc.push([hour, minute]);
          });

          return acc;
        }, [])
        .map(([hour, minute]) =>
          [String(hour).padStart(2, '0'), String(minute).padStart(2, '0')].join(':'),
        )
        .map(interval => ({ value: interval, label: interval })),
    [from, hourStep, minuteStep, to],
  );
};
