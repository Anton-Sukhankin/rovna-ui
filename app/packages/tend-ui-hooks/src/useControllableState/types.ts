export type UseUncontrolledStateParameters<T> = {
  defaultValue?: T | undefined;
  onChange?: (state: T) => void;
};
export type UseControllableStateParameters<T> = {
  value?: T | undefined;
  defaultValue?: T | undefined;
  onChange?: (state: T) => void;
};
