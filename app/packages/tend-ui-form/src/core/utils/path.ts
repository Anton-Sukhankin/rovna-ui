export const toKey = (name: string | string[]) => {
  return Array.isArray(name) ? name.join('.') : name;
};

export const toPath = (key: string) => {
  return key.split('.');
};
