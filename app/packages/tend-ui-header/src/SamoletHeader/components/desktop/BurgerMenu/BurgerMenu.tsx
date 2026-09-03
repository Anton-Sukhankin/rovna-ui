import React from 'react';
import { Button, Dropdown, Tooltip } from '@rovna-ui/components/primitives';
import { Image } from '@rovna-ui/components/ui';
import { Sync } from '@rovna-ui/icons/Sync';
import { Error } from '@rovna-ui/icons/Error';
import { CardView } from '@rovna-ui/icons/CardView';
import { Apps as AppsIcon } from '@rovna-ui/icons/Apps';
import { Box, Divider } from '@rovna-ui/components/grid';
import { Text } from '@rovna-ui/typography';
import { LiteralUnion, SamoletService as SamoletApp, Stand } from '@rovna-ui/types';
import chunk from 'lodash/chunk';

import { useSamoletServices } from '@rovna-internal/header/SamoletHeader/hooks/useSamoletServices';
import type { SamoletService } from '@rovna-internal/header/SamoletHeader/hooks/types';
import { Button as BurgerButton } from '@rovna-internal/header/ui/Button';
import {
  getSamoletHeaderRuntimeConfig,
  getSamoletHeaderUrl,
} from '@rovna-internal/header/consts';

import { Card, Preloader } from './components';
import { BurgerMenuProps } from './types';

const Content = ({ app, stand }: { stand: Stand; app: LiteralUnion<SamoletApp> }) => {
  const { data, error, loading, request, available } = useSamoletServices(stand);
  const { serviceIconBaseUrl } = getSamoletHeaderRuntimeConfig();
  const personalAccountUrl = getSamoletHeaderUrl('personalAccount', stand);
  const servicesPageUrl = getSamoletHeaderUrl('servicesPage', stand);

  React.useEffect(() => {
    if (available) request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [available]);

  const hasLk = !!data?.lk;

  const src = React.useCallback((service: SamoletService) => {
    if (!serviceIconBaseUrl) return service.icon.file;

    const color = service.isActive ? 'blue600' : 'gray400';
    return `${serviceIconBaseUrl.replace(/\/$/, '')}/${service.tuiIconName}-${color}.svg`;
  }, [serviceIconBaseUrl]);

  const result = React.useMemo(() => chunk(data?.categories, 4), [data?.categories]);

  if (error)
    // TODO: Вынести в компонент ошибки
    return (
      <Box
        $padding='128px 343px'
        $display='flex'
        $flexDirection='column'
        $alignItems='center'
      >
        <Error color='gold600' size={20} />
        <Text strong>Ошибка загрузки</Text>
        <Text color='gray500'>Попробуйте еще раз</Text>
        <Button
          type='button'
          variant='link'
          before={<Sync />}
          onClick={() => {
            request();
          }}
        >
          Обновить
        </Button>
      </Box>
    );

  if (loading || !data) return <Preloader />;

  return (
    <>
      <Box $display='flex' $alignItems='center' $gap={8}>
        {hasLk && personalAccountUrl && (
          <a
            href={personalAccountUrl}
            target='_blank'
            rel='noreferrer'
          >
            <Card hovered before={<CardView color='blue600' size={20} />}>
              Личный кабинет
            </Card>
          </a>
        )}
        {servicesPageUrl && (
          <a href={servicesPageUrl} target='_blank' rel='noreferrer'>
          <Card hovered before={<AppsIcon color='blue600' size={20} />}>
            Все сервисы
          </Card>
          </a>
        )}
      </Box>
      <Divider margin={24} />
      <Box $display='flex' $flexDirection='column' $gap={24}>
        {result.map((portion, index) => (
          <Box key={index} $display='flex' $gap={8}>
            {portion.map(data => (
              <Box key={data.name} $display='flex' $flexDirection='column'>
                <Box $padding={8}>
                  <Text strong>{data.name}</Text>
                </Box>
                {data.services.map(service => {
                  const [name] = service.name.split(' ');
                  const title = service.isActive
                    ? service.shortDescription
                    : 'Другие продукты производственной системы будут доступны после подписания договора';

                  return (
                    <Tooltip key={service.id} title={title}>
                      <a
                        target='_blank'
                        href={service.isActive ? service.link : undefined}
                        rel='noreferrer'
                      >
                        <Card
                          selected={name.toLowerCase() === app}
                          disabled={!service.isActive}
                          before={
                            <Image width={20} src={src(service)} alt={service.name} />
                          }
                        >
                          {service.name}
                        </Card>
                      </a>
                    </Tooltip>
                  );
                })}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </>
  );
};

export const BurgerMenu = ({ app, stand }: BurgerMenuProps) => {
  const [open, setOpen] = React.useState(false);
  const renderDropdown = React.useCallback(
    () => (
      <Dropdown.Content padding={24}>
        <Content stand={stand} app={app} />
      </Dropdown.Content>
    ),
    [app, stand],
  );

  if (!getSamoletHeaderUrl('servicesApi', stand)) return null;

  return (
    <Dropdown
      trigger={['click']}
      onOpenChange={setOpen}
      dropdownRender={renderDropdown}
    >
      <BurgerButton selected={open}>
        <AppsIcon size={24} color='gray0' />
      </BurgerButton>
    </Dropdown>
  );
};
