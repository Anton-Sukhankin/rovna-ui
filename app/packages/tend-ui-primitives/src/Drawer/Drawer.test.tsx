import React from 'react';
import { render, screen } from '@testing-library/react';

import { Drawer } from './Drawer';

const ROVNA_UI_FOOTER_CLASS_NAME = '.rovna-ui-drawer-footer';
describe('Drawer', () => {
  it('renders without crashing', () => {
    const { container } = render(<Drawer open />);
    expect(container).toBeTruthy();
  });

  it('displays title when provided', () => {
    render(<Drawer open title='Test Title' />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('displays description when provided', () => {
    render(<Drawer open description='Test Description' />);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('displays children when provided', () => {
    render(<Drawer open>Drawer Content</Drawer>);
    expect(screen.getByText('Drawer Content')).toBeInTheDocument();
  });

  it('applies an accessible name to the dialog panel', () => {
    render(<Drawer aria-label='Настройки' open />);

    expect(screen.getByRole('dialog', { name: 'Настройки' })).toBeInTheDocument();
  });

  describe('footer', () => {
    it('renders footer when footer prop is provided', () => {
      render(<Drawer open footer={<div>Footer Content</div>} />);
      expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });

    it('does not render footer when footer prop is not provided', () => {
      const { container } = render(<Drawer open />);
      expect(
        container.querySelector(`${ROVNA_UI_FOOTER_CLASS_NAME}`),
      ).not.toBeInTheDocument();
    });

    it('does not render footer when footer prop is null', () => {
      const { container } = render(<Drawer open footer={null} />);
      expect(
        container.querySelector(`${ROVNA_UI_FOOTER_CLASS_NAME}`),
      ).not.toBeInTheDocument();
    });
  });
});
