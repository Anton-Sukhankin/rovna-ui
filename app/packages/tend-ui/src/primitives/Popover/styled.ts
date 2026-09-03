import AntPopover from 'antd-core/es/popover';
import styled from 'styled-components';

import { withInjectedClassName } from '@rovna-internal/components/hocs';

export const Root = styled(withInjectedClassName(AntPopover, 'overlayClassName'))`
  &.rovna-ui-popover {
    .rovna-ui-popover-title {
      font-size: 16px;
    }
    .rovna-ui-popover-inner {
      padding: 16px;
    }
  }
`;
