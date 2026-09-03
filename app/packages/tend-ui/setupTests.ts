import '@testing-library/jest-dom';
import 'jest-styled-components';

const localStorageFactory = () => {
  let store = {};

  return {
    getItem: key => {
      return store[key];
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

Object.defineProperty(window, 'localStorage', { value: localStorageFactory() });
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
