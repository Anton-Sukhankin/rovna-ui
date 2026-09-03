import styled from 'styled-components';
import AntTree from 'antd-core/es/tree/Tree';

export const Root = styled(AntTree)`
  &.rovna-ui-tree {
    .rovna-ui-tree-switcher {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
    }
    .rovna-ui-tree-checkbox .rovna-ui-tree-checkbox-inner {
      border-radius: 4px;
    }
  }
`;
