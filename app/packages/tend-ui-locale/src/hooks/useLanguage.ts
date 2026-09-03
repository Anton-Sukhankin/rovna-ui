import { useLanguageContext } from '../contexts/LanguageContext';

export const useLanguage = (consumer?: string) => useLanguageContext(consumer);
