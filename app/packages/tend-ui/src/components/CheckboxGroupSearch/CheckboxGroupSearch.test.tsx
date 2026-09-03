import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-test-renderer';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { CheckboxGroupSearch } from './CheckboxGroupSearch';

describe('CheckboxGroupSearch', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(
      <CheckboxGroupSearch
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
          { value: '3', label: 'Option 3' },
        ]}
      />,
    );

    expect(snap).toMatchSnapshot();
  });
  describe('when option is clicked', () => {
    it('executes "onChange" callback correctly', async () => {
      const mockOnChange = jest.fn();
      const renderer = render(
        <CheckboxGroupSearch
          filterOptionProp='label'
          onChange={mockOnChange}
          options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
          ]}
        />,
      );

      expect(renderer.getByText(/Option 1/)).toBeInTheDocument();
      expect(renderer.getByText(/Option 2/)).toBeInTheDocument();
      expect(renderer.getByText(/Option 3/)).toBeInTheDocument();
      expect(mockOnChange).not.toHaveBeenCalled();

      await act(async () => {
        fireEvent.click(renderer.getByText(/Option 1/));
      });

      expect(mockOnChange).toHaveBeenCalledWith(['1']);

      const input = renderer.getByTestId('rovna-ui-input');

      await act(async () => {
        fireEvent.change(input, { target: { value: 'Option 3' } });
      });

      await act(async () => {
        fireEvent.click(renderer.getByText(/Option 3/));
      });

      expect(mockOnChange).toHaveBeenCalledWith(['1', '3']);
    });
  });
  it('filters options correctly', async () => {
    const renderer = render(
      <CheckboxGroupSearch
        filterOptionProp='label'
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
          { value: '3', label: 'Option 3' },
        ]}
      />,
    );

    expect(renderer.getByText(/Option 1/)).toBeInTheDocument();
    expect(renderer.getByText(/Option 2/)).toBeInTheDocument();
    expect(renderer.getByText(/Option 3/)).toBeInTheDocument();

    const input = renderer.getByTestId('rovna-ui-input');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'Option 1' } });
    });

    expect(renderer.queryByText(/Option 2/)).not.toBeInTheDocument();
    expect(renderer.queryByText(/Option 3/)).not.toBeInTheDocument();
  });
  describe('when "value" is given', () => {
    it('renders selected options correctly', async () => {
      const renderer = render(
        <CheckboxGroupSearch
          value={['1']}
          options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
          ]}
        />,
      );

      expect(renderer.getByText(/Option 1/)).toBeInTheDocument();
      expect(renderer.getByText(/Option 2/)).toBeInTheDocument();
      expect(renderer.getByText(/Option 3/)).toBeInTheDocument();

      expect(renderer.getByDisplayValue(/1/)).toBeChecked();
      expect(renderer.getByDisplayValue(/2/)).not.toBeChecked();
      expect(renderer.getByDisplayValue(/3/)).not.toBeChecked();
    });
  });

  describe('when "value" is changed to "undefined"', () => {
    it('resets selected values correctly', async () => {
      const renderer = render(
        <CheckboxGroupSearch
          value={['1']}
          options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
          ]}
        />,
      );

      expect(renderer.getByDisplayValue(/1/)).toBeChecked();
      expect(renderer.getByDisplayValue(/2/)).not.toBeChecked();
      expect(renderer.getByDisplayValue(/3/)).not.toBeChecked();

      renderer.rerender(
        <CheckboxGroupSearch
          value={undefined}
          options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
          ]}
        />,
      );

      expect(renderer.getByDisplayValue(/1/)).not.toBeChecked();
      expect(renderer.getByDisplayValue(/2/)).not.toBeChecked();
      expect(renderer.getByDisplayValue(/3/)).not.toBeChecked();
    });
  });
});
