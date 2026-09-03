import React from 'react';

import { DrawerProps } from '../types';

/**
 * @internal Не для публичного использования
 */
export const DrawerContext = React.createContext<DrawerProps | undefined>(undefined);
/**
 * @internal Не для публичного использования
 */
export const useDrawerContext = () => React.useContext(DrawerContext);
