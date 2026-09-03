import React from 'react';
import AntSpace from 'antd-core/es/space';

type AntSpaceProps = React.ComponentPropsWithoutRef<typeof AntSpace>;
export type SpaceRef = React.ElementRef<typeof AntSpace>;
export type SpaceProps = AntSpaceProps & {
  fullWidth?: boolean;
  grow?: 'first' | 'last';
};
