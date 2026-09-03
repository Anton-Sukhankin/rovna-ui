import React from 'react';
import { Icon } from '@rovna-ui/icons/Icon';

import { Circle } from '@rovna-internal/primitives/Empty/styled';
import { EmptySize } from '@rovna-internal/primitives/Empty/types';
import { CIRCLE_SIZES, ICON_SIZES } from '@rovna-internal/primitives/Empty/consts';

export const Filter = ({ size }: { size: EmptySize }) => {
  return (
    <Circle $size={CIRCLE_SIZES[size]}>
      <Icon size={ICON_SIZES[size]}>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 100 100'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            opacity='0.4'
            d='M47.9166 87.5C69.7779 87.5 87.5 69.7779 87.5 47.9167C87.5 26.0554 69.7779 8.33334 47.9166 8.33334C26.0554 8.33334 8.33331 26.0554 8.33331 47.9167C8.33331 69.7779 26.0554 87.5 47.9166 87.5Z'
            fill='#A5A7AF'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M60.4167 44.7917H35.4167C33.7084 44.7917 32.2917 43.375 32.2917 41.6667C32.2917 39.9583 33.7084 38.5417 35.4167 38.5417H60.4167C62.125 38.5417 63.5417 39.9583 63.5417 41.6667C63.5417 43.375 62.125 44.7917 60.4167 44.7917ZM47.9167 57.2917H35.4167C33.7084 57.2917 32.2917 55.875 32.2917 54.1667C32.2917 52.4583 33.7084 51.0417 35.4167 51.0417H47.9167C49.625 51.0417 51.0417 52.4583 51.0417 54.1667C51.0417 55.875 49.625 57.2917 47.9167 57.2917ZM86.7086 90.8315C87.2503 91.3732 88.0003 91.6649 88.7503 91.6649C89.5003 91.6649 90.2503 91.3732 90.8336 90.8315C91.9586 89.6649 91.9586 87.8315 90.8336 86.7065L83.0836 78.9565C81.9169 77.8315 80.0836 77.8315 78.9586 78.9565C77.8336 80.1232 77.8336 81.9565 78.9586 83.0815L86.7086 90.8315Z'
            fill='#A5A7AF'
          />
        </svg>
      </Icon>
    </Circle>
  );
};
