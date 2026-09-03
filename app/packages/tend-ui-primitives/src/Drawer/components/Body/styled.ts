import styled from 'styled-components';

export const Root = styled.div`
  &.rovna-ui-drawer-body {
    flex: 1;
    padding: 12px 24px;
    overflow: auto;

    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    /* FIXME: Мигрировать на переменные */
    ::-webkit-scrollbar-track {
      background: #f4f4f5ff;
      border-radius: 16px;
    }

    /* FIXME: Мигрировать на переменные */
    ::-webkit-scrollbar-thumb {
      background-color: #dddee1ff;
      border-radius: 16px;
    }
  }
`;
