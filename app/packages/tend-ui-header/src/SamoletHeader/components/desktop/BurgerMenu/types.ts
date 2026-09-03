import { LiteralUnion, SamoletService as SamoletApp, Stand } from '@rovna-ui/types';

export type BurgerMenuProps = {
  stand: Stand;
  app: LiteralUnion<SamoletApp>;
};
