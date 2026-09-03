export const isEscapedHtml = (str: string) => {
  const htmlRegex = /&[a-zA-Z]+;/;

  return htmlRegex.test(str);
};
