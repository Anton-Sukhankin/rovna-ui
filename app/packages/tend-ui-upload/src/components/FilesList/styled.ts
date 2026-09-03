import styled from 'styled-components';

export const List = styled.ul`
  box-sizing: border-box;
  width: 100%;
  list-style: none;
  margin: 8px 0 0 0;
  padding: 0px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const ListItem = styled.li`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 4px 8px;
  border-radius: 4px;
  list-style: none;
  background-color: transparent;
  min-height: 32px;

  display: flex;
  align-items: center;
  gap: 8px;
  /* Animation */
  transition: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-property: background-color;

  &:hover {
    background-color: ${props => props.theme.colors.gray50};
  }

  /* Цвет текста по дефолту */
  .rovna-ui-upload-list-item-before,
  .rovna-ui-upload-list-item-after {
    color: ${props => props.theme.colors.gray500};
  }
`;

export const Button = styled.button`
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  width: 20px;
  height: 20px;
  padding: 2px;
`;
