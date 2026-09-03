import { create } from 'storybook/theming/create';

export default create({
  base: 'dark',
  brandTitle: 'Rovna UI',
  brandUrl: process.env.ROVNA_UI_STORYBOOK_BRAND_URL || '/',
  ...(process.env.ROVNA_UI_STORYBOOK_BRAND_IMAGE_URL
    ? { brandImage: process.env.ROVNA_UI_STORYBOOK_BRAND_IMAGE_URL }
    : {}),
  brandTarget: '_self',
});
