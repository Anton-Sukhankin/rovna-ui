import React from 'react';
import AntBase, { BlockProps } from 'antd-core/es/typography/Base';
// Antd Paragraph is not sematic correct
// Antd Title does not support h6 level
// Also bad practice, better to write own "Paragraph" and "Title" component from scratch
// References:
// https://github.com/ant-design/ant-design/blob/master/components/typography/Title.tsx
// https://github.com/ant-design/ant-design/issues/20710
// https://github.com/ant-design/ant-design/blob/master/components/typography/Paragraph.tsx
// https://github.com/ant-design/ant-design/issues/15883

export interface BaseProps<
  C extends keyof React.JSX.IntrinsicElements = keyof React.JSX.IntrinsicElements,
> extends BlockProps<C> {
  component?: C;
}

export const INTERNAL_TypographyBase = React.forwardRef<HTMLElement, BaseProps>(
  (props, ref) => {
    return <AntBase ref={ref} {...props} />;
  },
);
