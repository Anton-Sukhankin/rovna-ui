import AntDropdown from 'antd-core/es/dropdown';
import styled from 'styled-components';

import { withInjectedClassName } from '@rovna-internal/components/hocs/withInjectedClassName';
import { Box } from '@rovna-internal/components/grid/Box';

export const Root = styled(withInjectedClassName(AntDropdown, 'overlayClassName'))``;
export const Content = styled(Box)`
  border-radius: 12px;
  background: white;
  box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.1);

  .rovna-ui-dropdown-menu .rovna-ui-dropdown-menu-item {
    line-height: 20px;
  }
`;
