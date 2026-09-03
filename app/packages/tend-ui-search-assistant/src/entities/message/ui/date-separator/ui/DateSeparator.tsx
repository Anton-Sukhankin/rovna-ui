import { Text } from '@rovna-ui/components/typography';
import React, { useEffect, useRef } from 'react';

import { formatDate } from '../lib/utils';
import * as Styled from './DateSeparator.styled';

interface DateSeparatorProps {
  date: string;
}

export const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => {
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sticky = stickyRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        entry.target.classList.toggle('is-pinned', entry.intersectionRatio < 1);
      },
      { threshold: [1] },
    );

    if (sticky) observer.observe(sticky);

    return () => {
      if (sticky) observer.disconnect();
    };
  }, []);

  return (
    <Styled.Container ref={stickyRef}>
      <Styled.Body>
        <Text size='small' color='gray650'>
          {formatDate(date)}
        </Text>
      </Styled.Body>
    </Styled.Container>
  );
};
