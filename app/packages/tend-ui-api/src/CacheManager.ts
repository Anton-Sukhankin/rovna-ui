export type Snapshot<D = unknown> = { timestamp: number; data: D };

/**
 * @internal Not for public usage
 */
export const __CACHE = new Map<string, Snapshot>();

export class CacheManager {
  private readonly cacheTime?: number;

  private readonly staleTime?: number;

  constructor({
    cacheTime = 300_000,
    staleTime = 60_000,
  }: {
    cacheTime?: number;
    staleTime?: number;
  }) {
    this.cacheTime = cacheTime;
    this.staleTime = staleTime;

    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
    this.isFresh = this.isFresh.bind(this);
    this.isExists = this.isExists.bind(this);
    this.isStale = this.isStale.bind(this);
  }

  public get<D>(key: string) {
    return __CACHE.get(key) as { timestamp: number; data: D } | undefined;
  }

  public set<D>(key: string, payload: D) {
    __CACHE.set(key, { data: payload, timestamp: Date.now() });
  }

  public isExists(key: string) {
    return __CACHE.has(key);
  }

  public isFresh<D>(key: string) {
    const cached = this.get<D>(key);
    if (!cached) return false;

    const cacheTime = this.cacheTime ?? 300_000;
    const now = Date.now();
    const difference = now - cached.timestamp;

    return difference <= cacheTime;
  }

  public isStale<D>(key: string) {
    const cached = this.get<D>(key);
    if (!cached) return true;
    const cacheTime = this.cacheTime ?? 300_000;
    const staleTime = this.staleTime ?? 60_000;
    const now = Date.now();
    const difference = now - cached.timestamp;

    return difference > cacheTime && difference <= cacheTime + staleTime;
  }
}
