import React from 'react';
import nock from 'nock';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import { AsyncRadio } from './AsyncRadio';

describe('AsyncRadio', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
    nock.cleanAll();
  });

  describe('given "api" property is plaint url string', () => {
    beforeEach(() => {
      jest.clearAllTimers();
      jest.clearAllMocks();
      nock.cleanAll();
    });

    it('requests data correctly', async () => {
      const scope = nock('http://localhost')
        .get('/api/animals/')
        .reply(200, {
          results: [
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
            { id: 3, name: 'Option 3' },
            { id: 4, name: 'Option 4' },
            { id: 5, name: 'Option 5' },
          ],
        });

      const renderer = render(<AsyncRadio api='http://localhost/api/animals/' />);

      await waitFor(async () => {
        const option_1 = await renderer.findByText(/Option 1/);
        const option_2 = await renderer.findByText(/Option 2/);
        const option_3 = await renderer.findByText(/Option 3/);
        const option_4 = await renderer.findByText(/Option 4/);
        const option_5 = await renderer.findByText(/Option 5/);

        return [option_1, option_2, option_3, option_4, option_5].every(Boolean);
      });

      const option_1 = renderer.getByText(/Option 1/);
      const option_2 = renderer.getByText(/Option 2/);
      const option_3 = renderer.getByText(/Option 3/);
      const option_4 = renderer.getByText(/Option 4/);
      const option_5 = renderer.getByText(/Option 5/);

      expect(option_1).toBeInTheDocument();
      expect(option_2).toBeInTheDocument();
      expect(option_3).toBeInTheDocument();
      expect(option_4).toBeInTheDocument();
      expect(option_5).toBeInTheDocument();

      scope.done();
    });
    describe('when data is loaded', () => {
      it('calls "onLoad" correctly', async () => {
        const onLoadMock = jest.fn();
        const scope = nock('http://localhost')
          .get('/api/animals/')
          .reply(200, {
            results: [
              { id: 1, name: 'Option 1' },
              { id: 2, name: 'Option 2' },
              { id: 3, name: 'Option 3' },
              { id: 4, name: 'Option 4' },
              { id: 5, name: 'Option 5' },
            ],
          });

        const renderer = render(
          <AsyncRadio api='http://localhost/api/animals/' onLoad={onLoadMock} />,
        );

        await waitFor(async () => {
          const option_1 = await renderer.findByText(/Option 1/);
          const option_2 = await renderer.findByText(/Option 2/);
          const option_3 = await renderer.findByText(/Option 3/);
          const option_4 = await renderer.findByText(/Option 4/);
          const option_5 = await renderer.findByText(/Option 5/);

          return [option_1, option_2, option_3, option_4, option_5].every(Boolean);
        });

        expect(onLoadMock).toHaveBeenCalledWith([
          { id: 1, name: 'Option 1' },
          { id: 2, name: 'Option 2' },
          { id: 3, name: 'Option 3' },
          { id: 4, name: 'Option 4' },
          { id: 5, name: 'Option 5' },
        ]);

        scope.done();
      });
    });
    describe('when some value has been typed in order to search', () => {
      it('requests data with "search" parameter correctly', async () => {
        const scope = nock('http://localhost')
          .get('/api/animals/')
          .reply(200, {
            results: [
              { id: 1, name: 'Option 1' },
              { id: 2, name: 'Option 2' },
              { id: 3, name: 'Option 3' },
            ],
          })
          .get('/api/animals/?search=Option 1')
          .reply(200, {
            results: [{ id: 1, name: 'Option 1' }],
          });

        const renderer = render(<AsyncRadio api='http://localhost/api/animals/' />);

        await waitFor(async () => {
          const option_1 = await renderer.findByText(/Option 1/);
          const option_2 = await renderer.findByText(/Option 2/);
          const option_3 = await renderer.findByText(/Option 3/);

          return [option_1, option_2, option_3].every(Boolean);
        });

        expect(renderer.getByText(/Option 1/)).toBeInTheDocument();
        expect(renderer.getByText(/Option 2/)).toBeInTheDocument();
        expect(renderer.getByText(/Option 3/)).toBeInTheDocument();

        const input = renderer.getByTestId('rovna-ui-input');

        await act(async () => {
          fireEvent.change(input, { target: { value: 'Option 1' } });
        });

        // Waiting for other options to dissappear
        await waitFor(async () => {
          expect(renderer.queryByText(/Option 2/)).not.toBeInTheDocument();
          expect(renderer.queryByText(/Option 3/)).not.toBeInTheDocument();
        });

        scope.done();
      });
    });
  });

  describe('given "api" as a function', () => {
    beforeEach(() => {
      jest.clearAllTimers();
      jest.clearAllMocks();
      nock.cleanAll();
    });
    it('requests data correctly', async () => {
      const api = jest.fn().mockResolvedValue({
        results: [
          { id: 1, name: 'Option 1' },
          { id: 2, name: 'Option 2' },
          { id: 3, name: 'Option 3' },
          { id: 4, name: 'Option 4' },
          { id: 5, name: 'Option 5' },
        ],
      });

      const renderer = render(<AsyncRadio api={api} />);

      expect(api).toHaveBeenCalledTimes(1);

      const option_1 = await renderer.findByText(/Option 1/);
      const option_2 = await renderer.findByText(/Option 2/);
      const option_3 = await renderer.findByText(/Option 3/);
      const option_4 = await renderer.findByText(/Option 4/);
      const option_5 = await renderer.findByText(/Option 5/);

      expect(option_1).toBeInTheDocument();
      expect(option_2).toBeInTheDocument();
      expect(option_3).toBeInTheDocument();
      expect(option_4).toBeInTheDocument();
      expect(option_5).toBeInTheDocument();
    });
    describe('when data is loaded', () => {
      it('executes "onLoad" callback with data correctly', async () => {
        const api = jest.fn().mockResolvedValue({
          results: [
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
            { id: 3, name: 'Option 3' },
            { id: 4, name: 'Option 4' },
            { id: 5, name: 'Option 5' },
          ],
        });

        const onLoadMock = jest.fn();

        render(<AsyncRadio api={api} onLoad={onLoadMock} />);

        await waitFor(() => {
          expect(onLoadMock).toHaveBeenCalledWith([
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
            { id: 3, name: 'Option 3' },
            { id: 4, name: 'Option 4' },
            { id: 5, name: 'Option 5' },
          ]);
        });
      });
    });
    describe('when some option has been selected and there is some search value', () => {
      it('does not request data again', async () => {
        const onSearchMock = jest.fn();
        const api = jest.fn().mockResolvedValue({
          results: [
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
            { id: 3, name: 'Option 3' },
          ],
        });

        const renderer = render(<AsyncRadio api={api} onSearch={onSearchMock} />);

        expect(api).toHaveBeenCalledTimes(1);

        await waitFor(() => {
          expect(renderer.queryByText(/Option 1/)).toBeInTheDocument();
          expect(renderer.queryByText(/Option 2/)).toBeInTheDocument();
          expect(renderer.queryByText(/Option 3/)).toBeInTheDocument();
        });

        const input = renderer.getByTestId('rovna-ui-input');

        await act(async () => {
          fireEvent.change(input, { target: { value: 'Option 1' } });
        });

        await waitFor(() => {
          expect(onSearchMock).toHaveBeenCalledWith('Option 1');
        });

        expect(api).toHaveBeenCalledTimes(2);

        const option = renderer.getByText(/Option 1/);

        await act(async () => {
          fireEvent.click(option);
        });

        expect(api).not.toHaveBeenCalledTimes(3);
      });
    });

    describe('when some value has been typed in order to search', () => {
      it('requests data correctly', async () => {
        const api = jest.fn().mockResolvedValue({
          results: [
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
            { id: 3, name: 'Option 3' },
            { id: 4, name: 'Option 4' },
            { id: 5, name: 'Option 5' },
          ],
        });

        const renderer = render(<AsyncRadio api={api} />);

        expect(api).toHaveBeenCalledTimes(1);

        const input = renderer.getByTestId('rovna-ui-input');

        await act(async () => {
          fireEvent.change(input, { target: { value: 'Option 1' } });
        });

        await waitFor(() =>
          expect(api).toHaveBeenCalledWith({ params: { search: 'Option 1' } }),
        );
      });
    });

    describe('when "query" property has been changed', () => {
      it('requests data correctly', async () => {
        const api = jest.fn().mockResolvedValue({
          results: [
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
            { id: 3, name: 'Option 3' },
            { id: 4, name: 'Option 4' },
            { id: 5, name: 'Option 5' },
          ],
        });

        const renderer = render(<AsyncRadio api={{ fn: api }} />);

        expect(api).toHaveBeenCalledTimes(1);

        renderer.rerender(<AsyncRadio api={{ query: { contractor: 1 }, fn: api }} />);

        await waitFor(() =>
          expect(api).toHaveBeenCalledWith({ params: { contractor: 1 } }),
        );
      });
    });
  });
});
