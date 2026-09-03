import styled from 'styled-components';

export const Root = styled.div`
  /* Additional 4px margin for 8px in total */
  .rovna-ui-checkbox-group,
  .rovna-ui-toggle-group,
  .rovna-ui-radio-group {
    margin-top: 4px;
  }

  &:where(.rovna-ui-form-field-root-has-error) {
    .rovna-ui-form-message-root {
      color: ${props => props.theme.colors.red600};
    }
    .rovna-ui-checkbox-inner,
    .rovna-ui-picker,
    .rovna-ui-select-selector {
      border-color: ${props => props.theme.colors.red600};
    }
  }
  &:where(.rovna-ui-form-field-root-has-warning) {
    .rovna-ui-form-message-root {
      color: ${props => props.theme.colors.gold600};
    }
  }
  &:where(.rovna-ui-form-field-root-has-success) {
    .rovna-ui-form-message-root {
      color: ${props => props.theme.colors.green600};
    }
  }
`;
