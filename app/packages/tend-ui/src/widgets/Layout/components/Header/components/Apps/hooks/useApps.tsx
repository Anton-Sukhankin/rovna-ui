import React from 'react';
import {
  SBlueprint,
  SCenter,
  SContracts,
  SControl,
  SDocs,
  SFine,
  SHome,
  SKek,
  SMaterials,
  SPass,
  SPlan,
  SPro,
  SProgress,
  SProject,
  SRoomer,
  SSecurity,
  SSmr,
  STask,
  STeam,
  STender,
} from '@rovna-ui/logos';

import { BurgerMenuItem } from '@rovna-internal/components/components/BurgerMenu';

const links = [
  {
    name: 'S.Pro',
  },
  {
    name: 'S.Team',
  },
  {
    name: 'S.Materials',
  },
  {
    name: 'S.Progress',
  },
  {
    name: 'S.Tender',
  },
  {
    name: 'S.Smr',
  },
  {
    name: 'S.Center',
  },
  {
    name: 'S.Control',
  },
  {
    name: 'S.Home',
  },
  {
    name: 'S.Project',
  },
  {
    name: 'S.Roomer',
  },
  {
    name: 'S.Kek',
  },
  {
    name: 'S.Cost',
  },
  {
    name: 'S.Volume',
  },
  {
    name: 'S.Contracts',
  },
  {
    name: 'S.Pass',
  },
  {
    name: 'S.Docs',
  },
  {
    name: 'S.Security',
  },
  {
    name: 'S.Blueprint',
  },
  {
    name: 'S.Fine',
  },
  {
    name: 'S.Plan',
  },
  {
    name: 'S.Task',
  },
] as const;

const icons = {
  ['S.Pro']: <SPro />,
  ['S.Team']: <STeam />,
  ['S.Materials']: <SMaterials />,
  ['S.Progress']: <SProgress />,
  ['S.Tender']: <STender />,
  ['S.Smr']: <SSmr />,
  ['S.Center']: <SCenter />,
  ['S.Control']: <SControl />,
  ['S.Home']: <SHome />,
  ['S.Project']: <SProject />,
  ['S.Roomer']: <SRoomer />,
  ['S.Kek']: <SKek />,
  ['S.Cost']: '',
  ['S.Volume']: '',
  ['S.Contracts']: <SContracts />,
  ['S.Pass']: <SPass />,
  ['S.Docs']: <SDocs />,
  ['S.Security']: <SSecurity />,
  ['S.Blueprint']: <SBlueprint />,
  ['S.Fine']: <SFine />,
  ['S.Plan']: <SPlan />,
  ['S.Task']: <STask />,
} as const;

export const useApps = (hrefs: Record<string, string> = {}) => {
  return React.useMemo(
    () =>
      links.map<BurgerMenuItem<'a'>>(link => ({
        as: 'a',
        key: link.name,
        before: icons[link.name],
        label: link.name,
        href: hrefs[link.name],
        target: '_blank',
        disabled: !hrefs[link.name],
      })),
    [hrefs],
  );
};
