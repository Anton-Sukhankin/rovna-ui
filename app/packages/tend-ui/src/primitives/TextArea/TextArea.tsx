import React from 'react';
import AntTextArea from 'antd-core/es/input/TextArea';
import { extractMarginProps } from '@rovna-ui/styling';

import { useTheme } from '@rovna-internal/components/theme/Theme';
import { useAllowClear } from '@rovna-internal/components/hooks/useAllowClear';
import { useSize } from '@rovna-internal/components/hooks/useSize';
import { useInputTitle } from '@rovna-internal/components/hooks/useInputTitle';

import { Container, ResizerIcon } from './styled';
import { TextAreaProps, TextAreaRef } from './types';

const TextArea = React.forwardRef<TextAreaRef, TextAreaProps>(
  ({ className, fullWidth, autoSize = false, size = 'medium', ...props }, ref) => {
    const theme = useTheme();
    const allowClearProp = useAllowClear(props);
    const _size = useSize(size);
    const bind = useInputTitle(props);
    const textarea = React.useRef<TextAreaRef | null>(null);
    React.useImperativeHandle(ref, () => textarea.current as TextAreaRef);
    const { rest, ...margins } = extractMarginProps(props);

    return (
      <Container
        theme={theme}
        className={['rovna-ui-textarea-root', className].filter(Boolean).join(' ')}
        $fullWidth={fullWidth}
        {...margins}
      >
        <AntTextArea
          data-testid='rovna-ui-textarea'
          {...rest}
          {...bind}
          ref={textarea}
          autoSize={autoSize}
          allowClear={allowClearProp}
          size={_size}
        />
        {!autoSize && <ResizerIcon size={12} color='gray500' />}
      </Container>
    );
  },
);

TextArea.displayName = 'TextArea';

export { TextArea };
