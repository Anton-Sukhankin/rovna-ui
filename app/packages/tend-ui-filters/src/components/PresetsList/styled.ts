import { Radio as _Radio } from '@rovna-ui/components/primitives';
import styled from 'styled-components';

export const Radio = styled(_Radio)`
  width: 100%;

  &.rovna-ui-radio-wrapper span.rovna-ui-radio + * {
    width: 100%;
  }
`;
