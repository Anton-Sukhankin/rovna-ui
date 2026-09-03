import React from 'react';
import { Icon } from '@rovna-ui/icons/Icon';

import { Circle } from '@rovna-internal/primitives/Empty/styled';
import { EmptySize } from '@rovna-internal/primitives/Empty/types';
import { CIRCLE_SIZES, ICON_SIZES } from '@rovna-internal/primitives/Empty/consts';

export const Success = ({ size }: { size: EmptySize }) => {
  return (
    <Circle $size={CIRCLE_SIZES[size]}>
      <Icon size={ICON_SIZES[size]}>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 200 200'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect width='200' height='200' rx='100' fill='url(#paint0_linear_518_9854)' />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M137.626 72.7903C138.847 74.0107 138.847 75.9893 137.626 77.2097L102.21 112.626C100.989 113.847 99.0107 113.847 97.7903 112.626L81.1236 95.9597C79.9032 94.7393 79.9032 92.7607 81.1236 91.5403C82.344 90.3199 84.3226 90.3199 85.543 91.5403L100 105.997L133.207 72.7903C134.427 71.5699 136.406 71.5699 137.626 72.7903Z'
            fill='#A5A7AF'
          />
          <path
            opacity='0.4'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M87.5 65.625C75.4188 65.625 65.625 75.4188 65.625 87.5V112.5C65.625 124.581 75.4188 134.375 87.5 134.375H112.5C124.581 134.375 134.375 124.581 134.375 112.5V100C134.375 98.2741 135.774 96.875 137.5 96.875C139.226 96.875 140.625 98.2741 140.625 100V112.5C140.625 128.033 128.033 140.625 112.5 140.625H87.5C71.967 140.625 59.375 128.033 59.375 112.5V87.5C59.375 71.967 71.967 59.375 87.5 59.375H100C101.726 59.375 103.125 60.7741 103.125 62.5C103.125 64.2259 101.726 65.625 100 65.625H87.5Z'
            fill='#A5A7AF'
          />
          <defs>
            <linearGradient
              id='paint0_linear_518_9854'
              x1='36.5854'
              y1='185.366'
              x2='185.366'
              y2='31.7073'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#F2F7FB' />
              <stop offset='1' stopColor='#EAEDF5' stopOpacity='0' />
            </linearGradient>
          </defs>
        </svg>
      </Icon>
    </Circle>
  );
};
