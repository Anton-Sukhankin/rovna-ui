import React, { useCallback } from 'react';

import { useTheme } from '@rovna-internal/components/theme/Theme';

import { ellipsis, urlRegex } from '../utils';
import { StyledParagraph, StyledText } from './styled';

type TextWithLinksProps = {
  text: string;
};

export const TextWithLinks = ({ text }: TextWithLinksProps) => {
  const theme = useTheme();

  const words = text.split(urlRegex);

  const handleLinkClick = useCallback((url: string) => {
    window.open(url, '_blank');
  }, []);

  return (
    <StyledParagraph $theme={theme} ellipsis={ellipsis}>
      {words.map((word, index) => {
        if (urlRegex.test(word)) {
          return (
            <StyledText key={index} color='blue600' onClick={() => handleLinkClick(word)}>
              {word}
            </StyledText>
          );
        }

        return word;
      })}
    </StyledParagraph>
  );
};
