import 'styled-components';

import { ThemeSchema } from '@rovna-ui/theme/types/ThemeSchema';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, no-undef
  export interface DefaultTheme extends ThemeSchema {}
}
