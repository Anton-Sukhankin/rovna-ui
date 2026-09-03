import React from 'react';

export type LogoProps = {
  href?: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};
