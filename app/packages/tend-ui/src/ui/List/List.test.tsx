import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';
import { Home } from '@rovna-internal/components/icons';

import { List } from './List';

describe('List', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(
      <List>
        <List.Item>Item 1</List.Item>
        <List.Item>Item 2</List.Item>
        <List.Item>Item 3</List.Item>
      </List>,
    );

    expect(snap).toMatchSnapshot();
  });

  it('with "header" renders correctly', () => {
    const snap = snapshotWithTheme(
      <List header='Сортировка'>
        <List.Item>Item 1</List.Item>
        <List.Item>Item 2</List.Item>
        <List.Item>Item 3</List.Item>
      </List>,
    );

    expect(snap).toMatchSnapshot();
  });

  it('with "before" renders correctly', () => {
    const snap = snapshotWithTheme(
      <List>
        <List.Item before={<Home />}>Item 1</List.Item>
        <List.Item>Item 2</List.Item>
        <List.Item>Item 3</List.Item>
      </List>,
    );

    expect(snap).toMatchSnapshot();
  });

  it('with "after" renders correctly', () => {
    const snap = snapshotWithTheme(
      <List>
        <List.Item after={<Home />}>Item 1</List.Item>
        <List.Item>Item 2</List.Item>
        <List.Item>Item 3</List.Item>
      </List>,
    );

    expect(snap).toMatchSnapshot();
  });

  it('disabled renders correctly', () => {
    const snap = snapshotWithTheme(
      <List>
        <List.Item disabled>Item 1</List.Item>
        <List.Item disabled>Item 2</List.Item>
        <List.Item disabled>Item 3</List.Item>
      </List>,
    );

    expect(snap).toMatchSnapshot();
  });

  it('executes onItemClick callback when disabled', () => {
    const onItemClick = jest.fn();
    const renderer = render(
      <List onItemClick={onItemClick}>
        <List.Item value='apple'>Item 1</List.Item>
      </List>,
    );

    act(() => {
      fireEvent.click(renderer.getByText(/Item 1/));
    });

    expect(onItemClick).toHaveBeenCalledWith('apple');
  });

  it('does not executes onClick callback when disabled', () => {
    const onClickMock = jest.fn();
    const renderer = render(
      <List>
        <List.Item disabled onClick={onClickMock}>
          Item 1
        </List.Item>
      </List>,
    );

    act(() => {
      fireEvent.click(renderer.getByText(/Item 1/));
    });

    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('scrollable renders correctly', () => {
    const snap = snapshotWithTheme(
      <List scrollable>
        {Array.from({ length: 15 }).map((_, idx) => (
          <List.Item key={idx}>Item {idx}</List.Item>
        ))}
      </List>,
    );

    expect(snap).toMatchSnapshot();
  });

  it('scrollable with height renders correctly', () => {
    const snap = snapshotWithTheme(
      <List scrollable maxHeight='400px'>
        {Array.from({ length: 15 }).map((_, idx) => (
          <List.Item key={idx}>Item {idx}</List.Item>
        ))}
      </List>,
    );

    expect(snap).toMatchSnapshot();
  });
});
