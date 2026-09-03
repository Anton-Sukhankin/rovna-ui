import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';

import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders with default props', () => {
    const snap = snapshotWithTheme(<Pagination total={100} />);
    expect(snap).toMatchSnapshot();
  });

  it('renders with size="small"', () => {
    const snap = snapshotWithTheme(<Pagination total={100} size='small' />);
    expect(snap).toMatchSnapshot();
  });

  it('renders with showTotal', () => {
    const snap = snapshotWithTheme(
      <Pagination total={100} showTotal={total => `Всего ${total}`} />,
    );
    expect(snap).toMatchSnapshot();
  });

  it('renders with showLessItems', () => {
    const snap = snapshotWithTheme(<Pagination total={100} showLessItems />);
    expect(snap).toMatchSnapshot();
  });

  it('renders with showQuickJumper', () => {
    const snap = snapshotWithTheme(<Pagination total={100} showQuickJumper />);
    expect(snap).toMatchSnapshot();
  });

  it('renders with showSizeChanger', () => {
    const snap = snapshotWithTheme(<Pagination total={100} showSizeChanger />);
    expect(snap).toMatchSnapshot();
  });

  it('renders with all features enabled', () => {
    const snap = snapshotWithTheme(
      <Pagination
        total={100}
        size='small'
        showTotal={total => `Всего ${total}`}
        showLessItems
        showQuickJumper
        showSizeChanger
      />,
    );
    expect(snap).toMatchSnapshot();
  });

  it('renders with custom pageSizeOptions', () => {
    const snap = snapshotWithTheme(
      <Pagination total={100} showSizeChanger pageSizeOptions={['5', '10', '20']} />,
    );
    expect(snap).toMatchSnapshot();
  });

  it('renders with custom defaultCurrent', () => {
    const snap = snapshotWithTheme(<Pagination total={100} defaultCurrent={3} />);
    expect(snap).toMatchSnapshot();
  });
});
