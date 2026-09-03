import React from 'react';
import * as allIcons from '@rovna-ui/logos';
import { LogoWithBackground } from '@rovna-ui/logos/utils';
import { ApiOptions, useApi } from '@rovna-ui/api';

import { GlobalServiceResponse } from '@rovna-internal/header/Header/hooks';

type IconKeys = keyof typeof allIcons;

const getIcon = (iconName = 'RovnaUI'): React.ReactNode | null => {
  const iconKey = iconName as IconKeys;

  if (iconName in allIcons) {
    // eslint-disable-next-line import/namespace
    const IconComponent = allIcons[iconKey];

    // Если иконка не содержит "Colored" в названии, оборачиваем её в LogoWithBackground
    if (!iconName.includes('Colored')) {
      return (
        <LogoWithBackground backgroundColor='transparent'>
          <IconComponent />
        </LogoWithBackground>
      );
    }

    // Для иконок с "Colored" возвращаем как есть
    return <IconComponent />;
  }

  console.warn(`Icon "${iconName}" not found in icons collection`);

  return null;
};

export const useBurgerProps = (
  api: ApiOptions<GlobalServiceResponse[]> = { fn: () => Promise.resolve([]) },
) => {
  const { request, loading, error, data } = useApi(api);

  const { items, moduleOptions } = React.useMemo(() => {
    if (!data?.length) return { items: [], moduleOptions: [] };

    const visibleServices = data.filter(service => service?.fe_config?.icon_visible);

    const visibleServicesForBurger = visibleServices
      .filter(service => !window.location.hostname.includes(service.home_link))
      .sort((a, b) => a.display_name.localeCompare(b.display_name));

    const moduleOptions = visibleServices
      .map(service => ({
        value: service.home_link,
        label: service.display_name,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    // Находим сервисы, которые должны быть над разделителями
    const upperDividerServices = visibleServicesForBurger.filter(
      (service: GlobalServiceResponse) =>
        !service?.fe_config?.show_under_divider &&
        !service?.fe_config?.show_under_second_divider,
    );

    // Находим сервисы, которые должны быть под первым разделителем
    const underDividerServices = visibleServicesForBurger.filter(
      (service: GlobalServiceResponse) => service?.fe_config?.show_under_divider,
    );

    // Находим сервисы, которые должны быть под вторым разделителем
    const underSecondDividerServices = visibleServicesForBurger.filter(
      (service: GlobalServiceResponse) => service?.fe_config?.show_under_second_divider,
    );

    // Создаем первый разделитель только если есть сервисы под ним
    const divider =
      underDividerServices.length > 0
        ? { key: 'divider_item_1', type: 'divider' as const }
        : null;

    // Создаем второй разделитель только если есть сервисы под ним
    const secondDivider =
      underSecondDividerServices.length > 0
        ? { key: 'divider_item_2', type: 'divider' as const }
        : null;

    const items = [
      // Добавляем сервисы над разделителем
      ...upperDividerServices.map(service => ({
        key: service.name,
        label: service.display_name,
        icon: getIcon(service?.fe_config?.icon_name),
      })),
      // Добавляем первый разделитель если он нужен
      ...(divider ? [divider] : []),
      // Добавляем сервисы под разделителем
      ...underDividerServices.map(service => ({
        key: service.name,
        label: service.display_name,
        icon: getIcon(service?.fe_config?.icon_name),
      })),
      // Добавляем второй разделитель если он нужен
      ...(secondDivider ? [secondDivider] : []),
      // Добавляем сервисы под вторым разделителем
      ...underSecondDividerServices.map(service => ({
        key: service.name,
        label: service.display_name,
        icon: getIcon(service?.fe_config?.icon_name),
      })),
    ];

    return { items, moduleOptions };
  }, [data]);

  // Делаем запрос на каждое открытие бургера
  const onOpenChange = React.useCallback(
    (isOpen: boolean) => {
      if (isOpen) {
        request();
      }
    },
    [request],
  );

  // Обработчик для переходов по ссылкам
  const onSelect = React.useCallback(
    (keys: string[]) => {
      if (keys.length > 0 && data?.length) {
        const [key] = keys;
        const service = data.find(service => service.name === key);
        if (service?.home_link) {
          window.open(`https://${service.home_link}`, '_blank', 'noreferrer');
        }
      }
    },
    [data],
  );

  // Запрос при монтировании для быстрой загрузки
  React.useEffect(() => {
    request();
  }, [request]);

  return {
    loading,
    error,
    items,
    moduleOptions,
    onOpenChange,
    onSelect,
    // Дефолтные пропсы для Global-версии
    mode: 'none' as const,
    preloaderVariant: 'global' as const,
  };
};
