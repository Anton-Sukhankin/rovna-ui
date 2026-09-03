import { SamoletApp } from '@rovna-ui/types';

export type AppProps = {
  /** URL by product key. Missing URLs keep the catalog item disabled. */
  hrefs?: Record<string, string>;
  /** Optional URL for the footer action that opens the complete catalog. */
  allAppsHref?: string;
  /**
   * Какие продукты должны быть доступны
   */
  available?: SamoletApp[];
  /**
   * Какие продукты нужно подсветить как выбранные
   */
  selected?: SamoletApp[];
  /**
   * Какие продукты нужно скрыть
   */
  exclude?: SamoletApp[];
  /**
   * Какие продукты нужно отображать
   */
  include?: SamoletApp[];
};
