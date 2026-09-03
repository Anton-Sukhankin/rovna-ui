import React from 'react';
import { useMediaQuery } from '@rovna-ui/hooks';

/**
 * Внутренний компонент для нужд дизайн системы
 */
export const Responsive = ({
  children,
  mobile = null,
}: {
  children: React.ReactNode;
  mobile?: React.ReactNode;
}) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return isDesktop ? <>{children}</> : <>{mobile}</>;
};
