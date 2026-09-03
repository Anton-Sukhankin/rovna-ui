import 'styled-components';

import { ThemeSchema } from './src/types/ThemeSchema';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeSchema {}
}
