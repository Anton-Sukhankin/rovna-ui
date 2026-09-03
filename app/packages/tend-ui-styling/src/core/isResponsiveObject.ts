import { Breakpoint, Responsive, breakpoints } from '../types/Responsive';

export function isResponsiveObject<T extends string | number>(
  property: Responsive<T | Omit<string, T>> | undefined,
): property is Record<Breakpoint, string> {
  return (
    typeof property === 'object' &&
    Object.keys(property).some(key => (breakpoints as readonly string[]).includes(key))
  );
}
