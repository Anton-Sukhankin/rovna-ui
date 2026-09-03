import { filter } from './filter';
import { find } from './find';
import { append } from './append';

/**
 * @deprecated API может поменяться, не используйте в продакшене
 */
export const EXPERIMENTAL_move = <T extends { children?: T[] }>(
  nodes: T[],
  who: (node: T) => boolean,
  where: (node: T) => boolean,
) => {
  const inserted = find(nodes, who);
  if (!inserted) return nodes;
  const cleared = filter(nodes, v => !who(v));
  const moved = append(cleared, inserted, where);

  return moved;
};
