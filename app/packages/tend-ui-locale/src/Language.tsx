import React from 'react';

import { LanguageContext } from './contexts/LanguageContext';
import { Language as LanguageType } from './types';

const Language: React.FC<{ language: LanguageType }> = ({ children, language }) => {
  return <LanguageContext value={language}>{children}</LanguageContext>;
};

Language.displayName = 'Language';

export { Language };
