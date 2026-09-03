import '@testing-library/jest-dom';
import 'jest-styled-components';

const storageFactory = () => {
  let store = {};

  return {
    getItem: key => {
      return store[key] ?? null;
    },
    setItem: (key, value) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: key => {
      delete store[key];
    },
    getAll: () => {
      return store;
    },
  };
};

Object.defineProperty(window, 'localStorage', { value: storageFactory() });
Object.defineProperty(window, 'sessionStorage', { value: storageFactory() });
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
