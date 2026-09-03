export const STANDS = ['stage', 'prod', 'dev', 'mr', 'e2e'] as const;
export type Stand = (typeof STANDS)[number];
