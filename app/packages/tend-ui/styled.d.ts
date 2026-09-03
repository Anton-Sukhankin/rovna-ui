import 'styled-components';

import { ThemeSchema } from '@rovna-internal/components/theme/types/ThemeSchema';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeSchema {}
}
