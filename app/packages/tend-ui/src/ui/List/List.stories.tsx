import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Home } from '@rovna-internal/components/icons';
import { getRussianColor } from '@rovna-internal/components/stories/mockData';

import { List } from './List';

const meta: Meta<typeof List> = {
  title: 'Rovna UI/Main/UI/List',
  component: List,
};

export default meta;
type Story = StoryObj<typeof meta>;

const createList = (length = 5) =>
  Array.from({ length }).map((_, index) => getRussianColor(index));
export const Default: Story = {
  render: _args => (
    <List>
      {createList().map(v => (
        <List.Item key={v}>{v}</List.Item>
      ))}
    </List>
  ),
};

export const Disabled: Story = {
  render: _args => (
    <List>
      {createList().map(v => (
        <List.Item key={v} disabled>
          {v}
        </List.Item>
      ))}
    </List>
  ),
};

export const Header: Story = {
  render: _args => (
    <List header='Список'>
      {createList().map(v => (
        <List.Item key={v}>{v}</List.Item>
      ))}
    </List>
  ),
};

export const Before: Story = {
  render: _args => (
    <List>
      {createList().map(v => (
        <List.Item key={v} before={<Home />}>
          {v}
        </List.Item>
      ))}
    </List>
  ),
};

export const After: Story = {
  render: _args => (
    <List>
      {createList().map(v => (
        <List.Item key={v} after={<Home />}>
          {v}
        </List.Item>
      ))}
    </List>
  ),
};

export const OnClick: Story = {
  render: _args => (
    <List>
      <List.Item
        value='apple'
        onClick={(_, payload) => action('List item clicked')(payload)}
      >
        Яблоко, нажмите
      </List.Item>
      <List.Item
        value='apple'
        onClick={(_, payload) => action('List item clicked')(payload)}
      >
        Виноград, нажмите
      </List.Item>
      <List.Item
        value='banana'
        onClick={(_, payload) => action('List item clicked')(payload)}
      >
        Банан, нажмите
      </List.Item>
    </List>
  ),
};

export const OnItemClick: Story = {
  render: _args => (
    <List
      onItemClick={action('List item clicked')}
    >
      <List.Item value='apple'>Яблоко, нажмите</List.Item>
      <List.Item value='apple'>Виноград, нажмите</List.Item>
      <List.Item value='banana'>Банан, нажмите</List.Item>
    </List>
  ),
};

export const Scrollable: Story = {
  render: _args => (
    <List scrollable>
      {createList(20).map(v => (
        <List.Item key={v} after={<Home />}>
          {v}
        </List.Item>
      ))}
    </List>
  ),
};

export const ScrollableMaxHeight: Story = {
  render: _args => (
    <List scrollable maxHeight='100px'>
      {createList(20).map(v => (
        <List.Item key={v} after={<Home />}>
          {v}
        </List.Item>
      ))}
    </List>
  ),
};
