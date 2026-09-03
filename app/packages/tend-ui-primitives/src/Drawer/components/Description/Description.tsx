import React from 'react';
import { Text } from '@rovna-ui/typography';

export type DescriptionProps = React.PropsWithChildren<unknown> & {
  className?: string;
  style?: React.CSSProperties;
};

const Description = ({ children, className, style }: DescriptionProps) => {
  return (
    <Text className={className} style={style}>
      {children}
    </Text>
  );
};

Description.displayName = 'Drawer.Description';

export { Description };
