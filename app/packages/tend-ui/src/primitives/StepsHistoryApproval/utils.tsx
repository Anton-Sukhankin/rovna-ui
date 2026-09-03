import React from 'react';

import {
  ActiveStepIcon,
  DisabledStepIcon,
  DoneStepIcon,
  ErrorStepIcon,
  FinishedStepIcon,
  FutureStepIcon,
} from './styled';
import { TVariant } from '../Steps/types';

/**
 * Склоняет слово после числительного по правилам русского языка.
 *
 * @param number - Число, на основе которого определяется форма слова.
 *                 Работает с целыми числами, включая отрицательные.
 * @param words - Массив форм слова в порядке:
 *                [1 предмет (именительный падеж),
 *                 2 предмета (родительный падеж ед.ч.),
 *                 5 предметов (родительный падеж мн.ч.)].
 *                Например: ['комментарий', 'комментария', 'комментариев'].
 * @param expectZero - Если `true`, то при `number = 0` вернёт `words[2]` (множественное число).
 *                     Если `false` (по умолчанию), вернёт пустую строку.
 * @returns Одна из форм слова в зависимости от числа.
 *
 * @example
 * declOfNum(1, ['яблоко', 'яблока', 'яблок']) // → 'яблоко'
 * declOfNum(3, ['яблоко', 'яблока', 'яблок']) // → 'яблока'
 * declOfNum(5, ['яблоко', 'яблока', 'яблок']) // → 'яблок'
 * declOfNum(0, ['яблоко', 'яблока', 'яблок'], true) // → 'яблок'
 * declOfNum(-2, ['яблоко', 'яблока', 'яблок']) // → 'яблока'
 */
export const declOfNum = (number: number, words: string[], expectZero?: boolean) => {
  if (!expectZero && !number) return '';

  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];
};

export const urlRegex = /(https?:\/\/[^\s]+)/g;

export const ICON_CONTAINER_SIZE: Record<TVariant, string> = {
  large: '32px',
  medium: '24px',
  small: '16px',
};

const ICON_SIZE: Record<TVariant, number> = {
  large: 24,
  medium: 16,
  small: 12,
};

export const stepIcon = (variant: TVariant): Record<string, React.ReactElement> => ({
  start: (
    <DoneStepIcon
      size={ICON_SIZE[variant]}
      data-status='done'
      variant={ICON_CONTAINER_SIZE[variant]}
    />
  ),
  middle: (
    <DoneStepIcon
      size={ICON_SIZE[variant]}
      data-status='done'
      variant={ICON_CONTAINER_SIZE[variant]}
    />
  ),
  cancel: (
    <ErrorStepIcon
      size={ICON_SIZE[variant]}
      data-status='error'
      variant={ICON_CONTAINER_SIZE[variant]}
    />
  ),
  finish: (
    <FinishedStepIcon size={ICON_SIZE[variant]} variant={ICON_CONTAINER_SIZE[variant]} />
  ),
  future: <FutureStepIcon data-status='future' variant={ICON_CONTAINER_SIZE[variant]} />,
  active: <ActiveStepIcon data-status='active' variant={ICON_CONTAINER_SIZE[variant]} />,
  disabled: (
    <DisabledStepIcon data-status='disabled' variant={ICON_CONTAINER_SIZE[variant]} />
  ),
});

export const isHistoryStepper = (current: number | undefined): current is undefined =>
  current === undefined || current === null;

export const src = [];

export const ellipsis = {
  rows: 5,
  expandable: true,
  symbol: 'Еще',
};
