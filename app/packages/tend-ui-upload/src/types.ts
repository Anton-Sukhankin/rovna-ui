import React from 'react';

import { CoreLayoutProps } from './core';
import { UseUploadParameters } from './core/interfaces';

type BaseHTMLProps = Pick<React.ComponentProps<'div'>, 'aria-invalid' | 'aria-required'>;
type BaseMethods = {
  setProgress: (uuid: string | string[], progress: number) => void;
  setMessage: (uuid: string | string[], message: string) => void;
};
export type UploadButtonRef = BaseMethods;
export type UploadAreaRef = BaseMethods;
export interface UploadButtonProps
  extends CoreLayoutProps,
    UseUploadParameters,
    BaseHTMLProps {
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export interface UploadAreaProps
  extends CoreLayoutProps,
    UseUploadParameters,
    BaseHTMLProps {
  limit?: string;
  description?: string;
}
