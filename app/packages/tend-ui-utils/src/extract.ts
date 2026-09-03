// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extract = (object: any, path: string[]) => {
  return path.reduce((o, k) => (o || {})[k], object);
};
