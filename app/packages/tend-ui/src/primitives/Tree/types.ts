import React from 'react';
import AntTree, { TreeProps as AntTreeProps, DataNode } from 'antd-core/es/tree';

export type TreeRef = React.ElementRef<typeof AntTree>;
export type TreeProps = Omit<AntTreeProps, 'switcherIcon'>;
export type { DataNode };
