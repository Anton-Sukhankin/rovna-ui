import { isEscapedHtml } from '@notifications/shared/lib/utils/isEscapedHtml';

export const getUnescapedHtml = (message: string) => {
  if (isEscapedHtml(message)) {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(message, 'text/html').body.textContent;

    return decodedString || '';
  }

  return message;
};
