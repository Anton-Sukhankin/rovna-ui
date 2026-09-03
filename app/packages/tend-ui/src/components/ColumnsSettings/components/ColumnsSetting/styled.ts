import styled from 'styled-components';
import { DragIndicator as DefaultDragIndicator } from '@rovna-ui/icons/DragIndicator';

import { Toggle as DefaultToggle } from '@rovna-internal/components/primitives/Toggle';

export const Toggle = styled(DefaultToggle)`
  width: 100%;
`;

export const DragIndicator = styled(DefaultDragIndicator)`
  cursor: grab;
`;
