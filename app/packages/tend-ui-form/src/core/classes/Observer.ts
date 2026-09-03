import { toKey } from '../utils';

export class Observer {
  private __map__: Map<string, (() => void)[]> = new Map();

  public on(path: string | string[], fn: () => void) {
    const key = toKey(path);
    const listeners = this.__map__.get(key);

    if (Array.isArray(listeners)) {
      listeners.push(fn);
    } else {
      this.__map__.set(key, [fn]);
    }

    return () => {
      this.__map__.get(key)?.filter(cb => cb !== fn);
    };
  }

  public notify(path: string | string[]) {
    const key = toKey(path);
    const listeners = this.__map__.get(key);
    listeners?.forEach(fn => fn());
  }

  public broadcast() {
    Array.from(this.__map__.values()).forEach(fns => {
      fns.forEach(fn => fn());
    });
  }
}
