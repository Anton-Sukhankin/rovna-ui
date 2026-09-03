import { height, margin } from '@rovna-ui/styling';
import { CSSProperties, css } from 'styled-components';

/**
 * @deprecated Перенести стили в RangePicker и удалить, больше не использовать
 * Не для публичного использования
 */
export const datePickerCss = css<{
  $height?: CSSProperties['height'];
  $width?: string;
  $fullWidth?: boolean;
}>`
  &.rovna-ui-picker {
    ${props => {
      if (props.$fullWidth)
        return css`
          width: 100%;
        `;

      return css`
        width: ${props.$width || '256px'};
      `;
    }}

    ${margin};
    ${height};
  }

  &.rovna-ui-picker-dropdown {
    .rovna-ui-picker-month-btn {
      text-transform: uppercase;
    }

    .rovna-ui-picker-header {
      padding: 8px 16px;
    }

    .rovna-ui-picker-header-super-prev-btn,
    .rovna-ui-picker-header-super-next-btn {
      display: none;
    }

    .rovna-ui-picker-date-panel .rovna-ui-picker-body {
      padding: 8px 16px;
    }
  }

  &.rovna-ui-picker-dropdown .rovna-ui-picker-year-panel .rovna-ui-picker-cell-inner,
  &.rovna-ui-picker-dropdown .rovna-ui-picker-quarter-panel .rovna-ui-picker-cell-inner,
  &.rovna-ui-picker-dropdown .rovna-ui-picker-month-panel .rovna-ui-picker-cell-inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;
  }
`;
