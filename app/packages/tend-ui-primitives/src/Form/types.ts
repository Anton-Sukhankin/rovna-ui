import React from 'react';

export type FormRef = HTMLFormElement;
export type FormProps = React.HTMLAttributes<HTMLFormElement> & {
  /**
   * Вертикальные отступы между `Field`
   */
  gap?: number;
};
