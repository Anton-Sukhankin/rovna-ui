import type { ReactElement } from 'react';
import ReactDOM from 'react-dom';

type Container = Element | DocumentFragment;

export type Root = {
  render(children: ReactElement | null): void;
  unmount(): void;
};

const createLegacyRoot = (container: Container): Root => ({
  render(children) {
    ReactDOM.render(children, container as Element);
  },
  unmount() {
    ReactDOM.unmountComponentAtNode(container as Element);
  },
});

export const createRoot = (container: Container): Root => createLegacyRoot(container);

export const hydrateRoot = (container: Container, children: ReactElement | null): Root => {
  ReactDOM.hydrate(children, container as Element);
  return createLegacyRoot(container);
};
