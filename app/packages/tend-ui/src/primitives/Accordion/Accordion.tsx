import React from 'react';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { AccordionProps, AccordionRef } from './types';
import { ArrowIcon, Description, Root, Title } from './styled';

const Accordion = React.forwardRef<AccordionRef, AccordionProps>(
  ({ items, ...props }, ref) => {
    const theme = useTheme();

    const itemsProp = items?.map(item => {
      const { title, description, ...props } = item;

      if (item.label) return item;

      return {
        ...props,
        description,
        label: (
          <>
            <Title theme={theme}>{title}</Title>
            <Description theme={theme}>{description}</Description>
          </>
        ),
      };
    });

    return (
      <Root
        data-testid='rovna-ui-accordion'
        {...props}
        $theme={theme}
        ref={ref}
        bordered
        expandIcon={props => <ArrowIcon size={20} $active={props.isActive} />}
        items={itemsProp}
        size='middle'
        ghost={false}
      />
    );
  },
);

Accordion.displayName = 'Accordion';

export { Accordion };
