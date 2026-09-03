export const collect = <T extends { key: string; children?: T[] }>(
  nodes: T[],
): string[] => {
  return nodes.flatMap(node => [node.key, ...collect(node.children || [])]);
};
