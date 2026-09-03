import { Stand } from '@rovna-ui/types';

type StandUrls = Partial<Record<Stand, string>>;

export type SamoletHeaderRuntimeConfig = {
  servicesApi?: StandUrls;
  personalAccount?: StandUrls;
  servicesPage?: StandUrls;
  analytics?: StandUrls;
  support?: StandUrls;
  avatarBaseUrl?: string;
  profileUrl?: string;
  serviceIconBaseUrl?: string;
};

type RuntimeConfig = {
  header?: SamoletHeaderRuntimeConfig;
};

let configuredRuntimeConfig: SamoletHeaderRuntimeConfig | undefined;

export const configureSamoletHeader = (config: SamoletHeaderRuntimeConfig) => {
  configuredRuntimeConfig = config;
};

export const getSamoletHeaderRuntimeConfig = () =>
  configuredRuntimeConfig ??
  (
    globalThis as typeof globalThis & { __ROVNA_UI_RUNTIME_CONFIG__?: RuntimeConfig }
  ).__ROVNA_UI_RUNTIME_CONFIG__?.header ??
  {};

export const getSamoletHeaderUrl = (
  key: keyof Pick<
    SamoletHeaderRuntimeConfig,
    'servicesApi' | 'personalAccount' | 'servicesPage' | 'analytics' | 'support'
  >,
  stand: Stand,
) => getSamoletHeaderRuntimeConfig()[key]?.[stand];
