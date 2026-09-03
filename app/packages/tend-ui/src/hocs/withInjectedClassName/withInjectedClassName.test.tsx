import React, { HTMLAttributes } from 'react';
import { render } from '@testing-library/react';

import { withInjectedClassName } from './withInjectedClassName';

const MockComponent1: React.FC<
  HTMLAttributes<HTMLDivElement> & { popupClassName?: string }
> = ({ popupClassName, ...props }) => {
  return <div {...props}>{popupClassName}</div>;
};

const MockComponent2: React.FC<
  HTMLAttributes<HTMLDivElement> & { extraClassNameProperty?: string }
> = ({ extraClassNameProperty, ...props }) => {
  return <div {...props}>{extraClassNameProperty}</div>;
};

describe('withInjectedClassName', () => {
  it('injects className to a property correctly', () => {
    const Result1 = withInjectedClassName(MockComponent1, 'popupClassName');
    const Result2 = withInjectedClassName(MockComponent2, 'extraClassNameProperty');
    const renderer_1 = render(<Result1 className='mock-class-name-1' />);
    const renderer_2 = render(<Result2 className='mock-class-name-2' />);
    expect(renderer_1.getByText('mock-class-name-1')).toBeInTheDocument();
    expect(renderer_2.getByText('mock-class-name-1')).toBeInTheDocument();
  });
});
