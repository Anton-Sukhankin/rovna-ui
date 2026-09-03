import React from 'react';
import { LiteralUnion, SamoletService as SamoletApp, Stand } from '@rovna-ui/types';

export type LogoProps = {
  stand: Stand;
  app: LiteralUnion<SamoletApp>;
  children?: React.ReactNode;
  before?: React.ReactNode;
  after?: React.ReactNode;
  onClick?: () => void;
};
