import React from 'react';
import AntLink from 'antd-core/es/typography/Link';
import { TextProperties } from '@rovna-ui/styling';

import { BaseTypographyProps } from '../types';

type AntLinkProps = React.ComponentPropsWithoutRef<typeof AntLink>;
export type LinkSize = 'large' | 'small' | 'medium';
export type LinkRef = HTMLElement;
export type LinkProps = Omit<BaseTypographyProps, 'color'> &
  Omit<AntLinkProps, 'color'> &
  TextProperties & {
    /**
     * Размер
     */
    size?: LinkSize;
    /**
     * Контент перед `children`
     */
    before?: React.ReactNode;
    /**
     * Контент после `children`
     */
    after?: React.ReactNode;
  };
