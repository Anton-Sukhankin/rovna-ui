export const queryKeys = {
  base: ['@rovna-ui/search'],

  history: () => [...queryKeys.base, 'history'] as const,
};
