export const extension = <T extends string = string>(name: T): string | null => {
  const matched = name.match(/\.[0-9a-z]+$/i);
  if (!matched) return null;
  const [ext] = matched;

  return ext;
};
