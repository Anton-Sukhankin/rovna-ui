export function traverse<T extends { children?: T[] }>(
  nodes: T[],
  fn: (node: T) => void,
) {
  nodes.forEach(node => {
    fn(node);
    if (Array.isArray(node.children) && node.children.length > 0) {
      traverse(node.children, fn);
    }
  });
}
