import styled from 'styled-components';

import { Tabs } from '@rovna-internal/components/primitives/Tabs';

export const Root = styled(Tabs)`
  &.rovna-ui-tabs > .rovna-ui-tabs-nav,
  &.rovna-ui-tabs > div > .rovna-ui-tabs-nav {
    margin: 0;
  }
`;
