type Options = {
  key: string;
  scope?: string;
};

export class SessionStorage {
  private key: string;

  constructor(options: Options) {
    this.key = options.scope ? `[${options.scope}][${options.key}]` : options.key;

    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
    this.has = this.has.bind(this);
    this.remove = this.remove.bind(this);
    this.clear = this.clear.bind(this);
  }

  public get<T = unknown>() {
    const result = sessionStorage.getItem(this.key);
    if (!result) return null;

    try {
      const content = JSON.parse(result);

      return content as T;
    } catch (error) {
      return null;
    }
  }

  public set<T = unknown>(value: T) {
    const content = JSON.stringify(value);
    sessionStorage.setItem(this.key, content);
  }

  public has() {
    const result = sessionStorage.getItem(this.key);

    return !!result;
  }

  public remove<T = unknown>() {
    const content = this.get<T>();
    sessionStorage.removeItem(this.key);

    return content;
  }

  public clear() {
    sessionStorage.clear();
  }

  static get<T = unknown>(key: string) {
    const result = sessionStorage.getItem(key);
    if (!result) return null;

    try {
      const content = JSON.parse(result);

      return content as T;
    } catch (error) {
      return null;
    }
  }

  static set<T = unknown>(key: string, value: T) {
    const content = JSON.stringify(value);
    sessionStorage.setItem(key, content);
  }

  static remove<T = unknown>(key: string) {
    const content = this.get<T>(key);
    sessionStorage.removeItem(key);

    return content;
  }

  static has(key: string) {
    const result = sessionStorage.getItem(key);

    return !!result;
  }

  static clear() {
    sessionStorage.clear();
  }
}
