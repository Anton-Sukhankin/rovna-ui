import { LiteralUnion, SamoletService } from '@rovna-ui/types';

const UPPER_CASED: LiteralUnion<SamoletService>[] = [
  's.aed',
  's.oda',
  's.rmp',
  's.ecm',
  's.sass',
  's.cp',
];

export const formatServiceName = <T extends LiteralUnion<SamoletService>>(app: T) => {
  if (UPPER_CASED.includes(app)) return app.toUpperCase();
  if (app === 's.limon') return 'S.LimOn';

  return app
    .replace(/-/g, ' ')
    .split('.')
    .map(p =>
      p
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
    )
    .join('.');
};
