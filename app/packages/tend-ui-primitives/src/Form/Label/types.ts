import React from 'react';

export type LabelRef = HTMLLabelElement;
export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};
