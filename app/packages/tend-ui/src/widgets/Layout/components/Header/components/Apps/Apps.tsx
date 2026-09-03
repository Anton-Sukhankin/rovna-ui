import React from 'react';
import {
  Roomer,
  SBlueprint,
  SCenter,
  SContracts,
  SControl,
  SCost,
  SDocs,
  SEcm,
  SFine,
  SHome,
  SKek,
  SLimon,
  SMaterials,
  SPass,
  SPlan,
  SPro,
  SProgress,
  SProject,
  SSecurity,
  SSmr,
  STask,
  STeam,
  STender,
  SVolume,
} from '@rovna-ui/logos';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { ArrowForward } from '@rovna-ui/icons/ArrowForward';

import { BurgerMenu, BurgerMenuItem } from '@rovna-internal/components/components/BurgerMenu';
import { Button } from '@rovna-internal/components/primitives/Button';

import { AppProps } from './types';

const links = [
  {
    key: 's.pro',
    name: 'S.Pro',
  },
  {
    key: 's.team',
    name: 'S.Team',
  },
  {
    key: 's.materials',
    name: 'S.Materials',
  },
  {
    key: 's.progress',
    name: 'S.Progress',
  },
  {
    key: 's.tender',
    name: 'S.Tender',
  },
  {
    key: 's.smr',
    name: 'S.Smr',
  },
  {
    key: 's.center',
    name: 'S.Center',
  },
  {
    key: 's.control',
    name: 'S.Control',
  },
  {
    key: 's.home',
    name: 'S.Home',
  },
  {
    key: 's.project',
    name: 'S.Project',
  },
  {
    key: 'roomer',
    name: 'Roomer',
  },
  {
    key: 's.kek',
    name: 'S.Kek',
  },
  {
    key: 's.cost',
    name: 'S.Cost',
  },
  {
    key: 's.volume',
    name: 'S.Volume',
  },
  {
    key: 's.contracts',
    name: 'S.Contracts',
  },
  {
    key: 's.pass',
    name: 'S.Pass',
  },
  {
    key: 's.docs',
    name: 'S.Docs',
  },
  {
    key: 's.security',
    name: 'S.Security',
  },
  {
    key: 's.blueprint',
    name: 'S.Blueprint',
  },
  {
    key: 's.fine',
    name: 'S.Fine',
  },
  {
    key: 's.plan',
    name: 'S.Plan',
  },
  {
    key: 's.task',
    name: 'S.Task',
  },
] as const;

const icons = {
  ['s.pro']: SPro,
  ['s.team']: STeam,
  ['s.materials']: SMaterials,
  ['s.progress']: SProgress,
  ['s.tender']: STender,
  ['s.smr']: SSmr,
  ['s.center']: SCenter,
  ['s.control']: SControl,
  ['s.home']: SHome,
  ['s.project']: SProject,
  ['roomer']: Roomer,
  ['s.kek']: SKek,
  ['s.cost']: SCost,
  ['s.volume']: SVolume,
  ['s.contracts']: SContracts,
  ['s.pass']: SPass,
  ['s.docs']: SDocs,
  ['s.security']: SSecurity,
  ['s.blueprint']: SBlueprint,
  ['s.fine']: SFine,
  ['s.plan']: SPlan,
  ['s.task']: STask,
  ['s.limon']: SLimon,
  ['s.ecm']: SEcm,
} as const;

const Apps = ({
  exclude,
  selected,
  available,
  include,
  hrefs = {},
  allAppsHref,
  ...props
}: AppProps) => {
  const t = useTranslation();
  const _include = include?.map(v => v.toLowerCase());
  const _exclude = exclude?.map(v => v.toLowerCase());
  const _available = available?.map(v => v.toLowerCase());

  const _items = React.useMemo(() => {
    return links
      .filter(link => {
        if (_include?.length) {
          return _include.includes(link.key);
        }

        if (_exclude?.length) {
          return !_exclude?.includes(link.key);
        }

        return true;
      })
      .map<BurgerMenuItem<'a'>>(link => {
        const href = hrefs[link.key];
        const disabled =
          !href || (_available?.length ? !_available.includes(link.key) : false);
        const tooltip = disabled
          ? {
              title:
                'Другие сервисы производственной системы будут доступны после подписания договора',
            }
          : undefined;
        const Icon = icons[link.key];

        return {
          as: 'a',
          key: link.key,
          before: <Icon color={disabled ? 'gray400' : undefined} />,
          label: link.name,
          href,
          target: '_blank',
          disabled,
          tooltip,
        };
      });
  }, [_available, _exclude, _include, hrefs]);

  return (
    <BurgerMenu
      selectedKeys={selected}
      items={_items}
      footer={
        allAppsHref ? (
        <Button
          as='a'
          href={allAppsHref}
          target='_blank'
          variant='ghost'
          after={<ArrowForward />}
        >
          {t(['widgets', 'Layout', 'Apps', 'all'])}
        </Button>
        ) : undefined
      }
      {...props}
    />
  );
};

Apps.displayName = 'Layout.Header.Apps';

export { Apps };
