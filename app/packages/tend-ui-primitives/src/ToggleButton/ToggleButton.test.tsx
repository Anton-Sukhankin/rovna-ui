import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { Settings } from '@rovna-ui/icons';

import { snapshotWithTheme } from '../../../tend-ui/src/tools/snapshotWithTheme';
import { ToggleButton } from './ToggleButton';

describe('ToggleButton', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(
      <ToggleButton>
        <Settings />
      </ToggleButton>,
    );

    const renderer = render(
      <ToggleButton>
        <Settings />
      </ToggleButton>,
    );

    expect(snap).toMatchSnapshot();
    expect(renderer.getByTestId('rovna-ui-settings-icon')).toBeInTheDocument();
  });

  describe('when "disabled" is "true" renders correctly', () => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(
        <ToggleButton disabled>
          <Settings />
        </ToggleButton>,
      );

      expect(snap).toMatchSnapshot();
    });
  });

  describe('when "selectable" is false', () => {
    it('does not call "onSelectedChange" callback', () => {
      const onSelectedChangeMock = jest.fn();
      const renderer = render(
        <ToggleButton selectable={false} onSelectedChange={onSelectedChangeMock}>
          <Settings />
        </ToggleButton>,
      );

      const btn = renderer.getByTestId('rovna-ui-toggle-button');

      act(() => {
        fireEvent.click(btn);
      });

      expect(onSelectedChangeMock).not.toHaveBeenCalled();
      expect(btn).not.toHaveStyle('background: rgb(0, 123, 251);');
    });
  });

  it('uncontrolled changes "selected" state correctly', async () => {
    const renderer = render(
      <ToggleButton>
        <Settings />
      </ToggleButton>,
    );
    const btn = renderer.getByTestId('rovna-ui-toggle-button');
    expect(btn.getAttribute('aria-pressed')).toBe('false');
    act(() => {
      fireEvent.click(btn);
    });
    expect(btn.getAttribute('aria-pressed')).toBe('true');
  });

  it('controlled changes "selected" state correctly', async () => {
    const Component = () => {
      const [selected, setSelected] = React.useState(false);

      return (
        <ToggleButton selected={selected} onSelectedChange={setSelected}>
          <Settings />
        </ToggleButton>
      );
    };
    const renderer = render(<Component />);
    const btn = renderer.getByTestId('rovna-ui-toggle-button');
    expect(btn.getAttribute('aria-pressed')).toBe('false');
    act(() => {
      fireEvent.click(btn);
    });
    expect(btn.getAttribute('aria-pressed')).toBe('true');
  });
});
