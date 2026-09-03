import { ComponentTokenMap } from 'antd-core/es/theme/interface';

export type Theming<
  ComponentName extends keyof ComponentTokenMap,
  Fields extends keyof NonNullable<ComponentTokenMap[ComponentName]>,
> = {
  theming?: Partial<Pick<NonNullable<ComponentTokenMap[ComponentName]>, Fields>>;
};
