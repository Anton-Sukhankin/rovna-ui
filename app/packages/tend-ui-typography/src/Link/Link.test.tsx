import React from 'react';
import { ChevronDown } from '@rovna-ui/icons';

import { snapshotWithTheme } from '../../../tend-ui/src/tools/snapshotWithTheme';
import { Link } from './Link';

describe('Link', () => {
  describe.each(['large', 'medium', 'small'] as const)('when "size" is %s', size => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(<Link size={size}>I am a link</Link>);
      expect(snap).toMatchSnapshot();
    });

    describe.each(['left', 'right'] as const)('and "textAlign" is %s', textAlign => {
      it('renders correctly', () => {
        const snap = snapshotWithTheme(
          <Link size={size} textAlign={textAlign}>
            I am a link
          </Link>,
        );
        expect(snap).toMatchSnapshot();
      });
    });

    describe('with "before" icon', () => {
      it('renders correctly', () => {
        const snap = snapshotWithTheme(
          <Link size={size} before={<ChevronDown />}>
            I am a link
          </Link>,
        );
        expect(snap).toMatchSnapshot();
      });
      describe('and "disabled" is "true"', () => {
        it('renders correctly', () => {
          const snap = snapshotWithTheme(
            <Link size={size} before={<ChevronDown />} disabled>
              I am a link
            </Link>,
          );
          expect(snap).toMatchSnapshot();
        });
      });
    });
    describe('with "after" icon', () => {
      it('with icon right renders correctly', () => {
        const snap = snapshotWithTheme(
          <Link size={size} after={<ChevronDown />}>
            I am a link
          </Link>,
        );
        expect(snap).toMatchSnapshot();
      });
      describe('and "disabled" is "true"', () => {
        it('renders correctly', () => {
          const snap = snapshotWithTheme(
            <Link disabled size={size} after={<ChevronDown />}>
              I am a link
            </Link>,
          );
          expect(snap).toMatchSnapshot();
        });
      });
    });
  });
});
