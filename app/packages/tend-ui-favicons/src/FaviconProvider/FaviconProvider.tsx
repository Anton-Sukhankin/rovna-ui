import React from 'react';
import { Helmet } from 'react-helmet';

import { FaviconType } from '../types';

export interface FaviconProviderProps {
  type: FaviconType;
  baseUrl?: string;
}

const getFaviconUrl = (
  baseUrl: string,
  type: FaviconType,
  size?: number,
  format?: string,
): string => {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '');

  if (format === 'ico') {
    return `${normalizedBaseUrl}/${type}.ico`;
  }
  if (format === 'svg') {
    return `${normalizedBaseUrl}/${type}.svg`;
  }
  if (format === 'apple-touch') {
    return `${normalizedBaseUrl}/${type}-apple-touch.png`;
  }

  return `${normalizedBaseUrl}/${type}-${size || 32}.png`;
};

export const FaviconProvider: React.FC<FaviconProviderProps> = ({
  type,
  baseUrl = '/favicons',
}) => {
  return (
    <Helmet>
      {/* SVG favicon (современные браузеры) */}
      <link
        rel='icon'
        type='image/svg+xml'
        href={getFaviconUrl(baseUrl, type, undefined, 'svg')}
      />

      {/* ICO favicon (старые браузеры) */}
      <link
        rel='icon'
        type='image/x-icon'
        href={getFaviconUrl(baseUrl, type, undefined, 'ico')}
      />

      {/* PNG favicons разных размеров */}
      <link rel='icon' type='image/png' sizes='16x16' href={getFaviconUrl(baseUrl, type, 16)} />
      <link rel='icon' type='image/png' sizes='32x32' href={getFaviconUrl(baseUrl, type, 32)} />
      <link rel='icon' type='image/png' sizes='48x48' href={getFaviconUrl(baseUrl, type, 48)} />

      {/* Apple Touch Icon */}
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href={getFaviconUrl(baseUrl, type, undefined, 'apple-touch')}
      />

      {/* Shortcut icon для IE */}
      <link rel='shortcut icon' href={getFaviconUrl(baseUrl, type, undefined, 'ico')} />
    </Helmet>
  );
};
