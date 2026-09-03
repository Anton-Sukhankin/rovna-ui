import React from 'react';
import { Image } from '@rovna-ui/components/ui';
import { isUndefined } from '@rovna-ui/utils';

import { INTERNAL_useStand as useStand } from '@rovna-internal/header/core/hooks';
import { Stand } from '@rovna-internal/header/core/Stand';
import { Logo as CoreLogo } from '@rovna-internal/header/core/Logo';
import { getSamoletHeaderRuntimeConfig } from '@rovna-internal/header/consts';

import { LogoProps } from './types';
import { formatServiceName } from './utils';

const Logo = ({ onClick, app, stand, after, children, before }: LogoProps) => {
  const svg = `${app.toLowerCase()}-gray0.svg`.replace('.', '');
  const { serviceIconBaseUrl } = getSamoletHeaderRuntimeConfig();
  const src = serviceIconBaseUrl
    ? `${serviceIconBaseUrl.replace(/\/$/, '')}/${svg}`
    : undefined;
  const { isProd } = useStand(stand);
  const content = React.useMemo(() => {
    if (!isUndefined(children)) return children;

    return formatServiceName(app);
  }, [app, children]);

  const _before = isUndefined(before)
    ? src && <Image width={20} src={src} />
    : before;
  const _after = isUndefined(after) ? !isProd && <Stand stand={stand} /> : after;

  return (
    <CoreLogo onClick={onClick} before={_before} after={_after}>
      {content}
    </CoreLogo>
  );
};

Logo.displayName = 'SamoletHeader.Logo';

export { Logo };
