import React from 'react';

import { snapshotWithTheme } from '@rovna-internal/components/tools/snapshotWithTheme';
import { RovnaUI } from '@rovna-internal/components/theme';
import { Paragraph } from '@rovna-internal/components/typography';

import { Status } from './Status';
import { statuses } from './types';

describe('Status', () => {
  describe('russian locale', () => {
    it('renders as default correctly', () => {
      const snap = snapshotWithTheme(<Status />);

      expect(snap).toMatchSnapshot();
    });

    it.each(statuses)('renders %s status correctly', status => {
      const snap = snapshotWithTheme(<Status status={status} />);

      expect(snap).toMatchSnapshot();
    });

    it('renders custom button correctly', () => {
      const snap = snapshotWithTheme(
        <Status button={{ preset: 'danger', children: 'Обновить' }} />,
      );

      expect(snap).toMatchSnapshot();
    });

    it.each(['Title', <div key='title'>Title</div>])(
      'renders custom "title" correctly',
      title => {
        const snap = snapshotWithTheme(<Status title={title} />);

        expect(snap).toMatchSnapshot();
      },
    );

    it.each(['Description', <div key='description'>Description</div>])(
      'renders custom "description" correctly',
      description => {
        const snap = snapshotWithTheme(<Status description={description} />);

        expect(snap).toMatchSnapshot();
      },
    );

    it('renders custom content correctly', () => {
      const snap = snapshotWithTheme(
        <Status
          status={403}
          content={
            <Paragraph>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, sit.
            </Paragraph>
          }
        />,
      );

      expect(snap).toMatchSnapshot();
    });
  });

  describe('english locale', () => {
    it('renders as default correctly', () => {
      const snap = snapshotWithTheme(
        <RovnaUI lang='en'>
          <Status />
        </RovnaUI>,
      );

      expect(snap).toMatchSnapshot();
    });

    it.each(statuses)('renders %s status correctly', status => {
      const snap = snapshotWithTheme(
        <RovnaUI lang='en'>
          <Status status={status} />
        </RovnaUI>,
      );

      expect(snap).toMatchSnapshot();
    });
  });
});
