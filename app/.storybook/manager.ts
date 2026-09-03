import { addons } from 'storybook/manager-api';
import rovna from './rovna';

addons.setConfig({
  panelPosition: 'right',
  theme: rovna,
});
