import React from 'react';

import { ButtonProps } from '@rovna-internal/components/primitives/Button';

export const statuses = [403, 404, 500] as const;
export type Status = (typeof statuses)[number];
export type StatusProps = {
  status?: Status;
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  button?: ButtonProps<'button'>;
  onClick?: () => void;
};
