import { SessionStorage } from './SessionStorage';
import { LocalStorage } from './LocalStorage';

beforeEach(() => {
  sessionStorage.clear();
  localStorage.clear();
});

describe.each([
  [LocalStorage, localStorage],
  [SessionStorage, sessionStorage],
] as const)('%s storage', (Entity, storage) => {
  it('sets data correctly', () => {
    const payload = 123;
    expect(storage.getItem('key')).toBeNull();
    Entity.set('key', payload);
    expect(storage.getItem('key')).toBe('123');
  });

  it('gets data correctly', () => {
    const payload = 123;
    expect(storage.getItem('key')).toBeNull();
    Entity.set('key', payload);
    expect(storage.getItem('key')).toBe('123');
    expect(Entity.get('key')).toBe(123);
  });

  it('removes data correctly', () => {
    expect(storage.getItem('key')).toBeNull();
    Entity.set('key', 123);
    Entity.set('key2', 456);

    expect(storage.getItem('key')).toBe('123');
    expect(Entity.get('key')).toBe(123);
    expect(storage.getItem('key2')).toBe('456');
    expect(Entity.get('key2')).toBe(456);

    Entity.remove('key2');

    expect(storage.getItem('key')).toBe('123');
    expect(Entity.get('key')).toBe(123);
    expect(storage.getItem('key2')).toBeNull();
    expect(Entity.get('key2')).toBeNull();
  });

  describe('as instance', () => {
    it('sets data correctly', () => {
      const payload = 123;

      const instance = new Entity({ key: 'key', scope: 'scope' });

      expect(storage.getItem('[scope][key]')).toBeNull();
      instance.set(payload);
      expect(storage.getItem('[scope][key]')).toBe('123');
    });
  });
});
