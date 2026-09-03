declare function isEqualWith(
  left: unknown,
  right: unknown,
  customizer?: (
    leftValue: unknown,
    rightValue: unknown,
    key?: PropertyKey,
    leftParent?: unknown,
    rightParent?: unknown,
  ) => boolean | undefined,
): boolean;

export = isEqualWith;
