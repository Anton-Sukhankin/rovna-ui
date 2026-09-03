import styled from 'styled-components';

import { Menu } from '@rovna-internal/components/primitives/Menu';

export const Root = styled(Menu)`
  &.rovna-ui-menu-horizontal {
    min-width: 0;
    flex: auto;
    margin-right: 120px;
  }
`;
