import { Stand } from '@rovna-ui/types';

export const INTERNAL_useStand = (stand: Stand) => {
  const isStage = stand === 'stage';
  const isDev = stand === 'stage';
  const isProd = stand === 'prod';
  const isE2e = stand === 'e2e';
  const isMr = stand === 'mr';

  return { isStage, isDev, isProd, isE2e, isMr };
};
