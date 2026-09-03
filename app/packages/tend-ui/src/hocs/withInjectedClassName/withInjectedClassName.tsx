import React from 'react';

/**
 * @description HOC passes a React "className" property to a given property name
 * in order to style off-DOM-rendered elements with "styled-components"
 */
export const withInjectedClassName = <
  P extends { className?: string },
  R = React.ElementRef<React.ComponentType<P>>,
>(
  Component: React.ComponentType<P>,
  propertyName: keyof P,
) => {
  return React.forwardRef<R, P>((props, ref) => {
    const property = [props[propertyName], props.className].filter(Boolean).join(' ');

    return <Component ref={ref} {...{ ...props, [propertyName]: property }} />;
  });
};
