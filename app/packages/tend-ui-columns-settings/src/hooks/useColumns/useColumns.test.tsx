import { act, renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';

import { useColumns } from './useColumns';

describe('useColumns', () => {
  afterEach(() => {
    localStorage.clear();
  });

  const columns = [
    { id: '1', title: 'Column 1' },
    { id: '2', title: 'Column 2' },
    { id: '3', title: 'Column 3' },
  ];

  it('returns correct result', () => {
    const { result } = renderHook(() =>
      useColumns({
        defaultColumns: columns,
      }),
    );

    expect(result.current.getAntdTableColumns()).toEqual([
      { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
      { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
      { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
    ]);
  });

  describe('when "getDefaultResetHandler" method is called', () => {
    it('resets columns to default correctly', async () => {
      const { result } = renderHook(() =>
        useColumns({
          defaultColumns: columns,
        }),
      );

      expect(result.current.getAntdTableColumns()).toEqual([
        { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
        { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
        { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
      ]);

      act(() => {
        result.current.getColumns()[0].hide();
      });

      act(() => {
        result.current.getApplyHandler()();
      });

      await waitFor(() => {
        expect(result.current.getAntdTableColumns()).toEqual([
          { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
          { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
        ]);
      });

      act(() => {
        result.current.getDefaultResetHandler()();
      });

      act(() => {
        result.current.getApplyHandler()();
      });

      await waitFor(() => {
        expect(result.current.getAntdTableColumns()).toEqual([
          { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
          { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
          { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
        ]);
      });
    });
  });
  describe('when "getMoveByIndexHandler" method is called', () => {
    it('swaps columns correctly', async () => {
      const { result } = renderHook(() =>
        useColumns({
          defaultColumns: columns,
        }),
      );

      expect(result.current.getAntdTableColumns()).toEqual([
        { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
        { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
        { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
      ]);

      act(() => {
        result.current.getMoveByIndexHandler()(0, 1);
      });

      act(() => {
        result.current.getApplyHandler()();
      });

      await waitFor(() => {
        expect(result.current.getAntdTableColumns()).toEqual([
          { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
          { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
          { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
        ]);
      });
    });
    it('unpin pinned column correctly', async () => {
      const { result } = renderHook(() =>
        useColumns({
          defaultColumns: columns,
        }),
      );

      expect(result.current.getAntdTableColumns()).toEqual([
        { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
        { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
        { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
      ]);

      act(() => {
        result.current.getColumns()[0].pin('left');
      });

      act(() => {
        result.current.getApplyHandler()();
      });

      await waitFor(() => {
        expect(result.current.getAntdTableColumns()).toEqual([
          {
            id: '1',
            title: 'Column 1',
            visible: true,
            pinnable: true,
            draggable: true,
            fixed: 'left',
          },
          { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
          { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
        ]);
      });

      act(() => {
        result.current.getMoveByIndexHandler()(0, 1);
      });

      act(() => {
        result.current.getApplyHandler()();
      });

      await waitFor(() => {
        expect(result.current.getAntdTableColumns()).toEqual([
          { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
          { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
          { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
        ]);
      });
    });
  });

  describe('visibility', () => {
    describe('when "show" method is called', () => {
      it('shows column correctly ', async () => {
        const { result } = renderHook(() =>
          useColumns({
            defaultColumns: [
              { id: '1', label: 'Column 1', visible: false },
              { id: '2', label: 'Column 2', visible: false },
              { id: '3', label: 'Column 3', visible: false },
              { id: '4', label: 'Column 4', visible: false },
            ],
          }),
        );

        expect(result.current.getAntdTableColumns()).toEqual([]);

        act(() => {
          result.current.getColumns()[0].show();
        });

        act(() => {
          result.current.getApplyHandler()();
        });

        await waitFor(() => {
          expect(result.current.getAntdTableColumns()).toEqual([
            {
              id: '1',
              title: 'Column 1',
              visible: true,
              pinnable: true,
              draggable: true,
            },
          ]);
        });
      });
    });
    describe('when "hide" method is called', () => {
      it('hides column correctly ', async () => {
        const { result } = renderHook(() =>
          useColumns({
            defaultColumns: [
              { id: '1', label: 'Column 1' },
              { id: '2', label: 'Column 2' },
              { id: '3', label: 'Column 3' },
              { id: '4', label: 'Column 4' },
            ],
          }),
        );

        expect(result.current.getAntdTableColumns()).toEqual([
          { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
          { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
          { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
          { id: '4', title: 'Column 4', visible: true, pinnable: true, draggable: true },
        ]);

        act(() => {
          result.current.getColumns()[0].hide();
        });

        act(() => {
          result.current.getApplyHandler()();
        });

        expect(result.current.getAntdTableColumns()).toEqual([
          { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
          { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
          { id: '4', title: 'Column 4', visible: true, pinnable: true, draggable: true },
        ]);

        act(() => {
          result.current.getColumns()[2].hide();
        });

        act(() => {
          result.current.getApplyHandler()();
        });

        await waitFor(() => {
          expect(result.current.getAntdTableColumns()).toEqual([
            {
              id: '2',
              title: 'Column 2',
              visible: true,
              pinnable: true,
              draggable: true,
            },
            {
              id: '4',
              title: 'Column 4',
              visible: true,
              pinnable: true,
              draggable: true,
            },
          ]);
        });
      });
    });
  });
  describe('pinning', () => {
    describe('when "pin" method is called', () => {
      it('pins column correctly ', async () => {
        const { result } = renderHook(() =>
          useColumns({
            defaultColumns: [
              { id: '1', label: 'Column 1' },
              { id: '2', label: 'Column 2' },
              { id: '3', label: 'Column 3' },
              { id: '4', label: 'Column 4' },
            ],
          }),
        );

        expect(result.current.getAntdTableColumns()).toEqual([
          { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
          { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
          { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
          { id: '4', title: 'Column 4', visible: true, pinnable: true, draggable: true },
        ]);

        act(() => {
          result.current.getColumns()[0].pin('left');
        });

        act(() => {
          result.current.getApplyHandler()();
        });

        await waitFor(() => {
          expect(result.current.getAntdTableColumns()).toEqual([
            {
              id: '1',
              title: 'Column 1',
              visible: true,
              pinnable: true,
              draggable: true,
              fixed: 'left',
            },
            {
              id: '2',
              title: 'Column 2',
              visible: true,
              pinnable: true,
              draggable: true,
            },
            {
              id: '3',
              title: 'Column 3',
              visible: true,
              pinnable: true,
              draggable: true,
            },
            {
              id: '4',
              title: 'Column 4',
              visible: true,
              pinnable: true,
              draggable: true,
            },
          ]);
        });

        act(() => {
          result.current.getColumns()[1].pin('right');
        });

        act(() => {
          result.current.getApplyHandler()();
        });

        await waitFor(() => {
          expect(result.current.getAntdTableColumns()).toEqual([
            {
              id: '1',
              title: 'Column 1',
              visible: true,
              pinnable: true,
              draggable: true,
              fixed: 'left',
            },
            {
              id: '3',
              title: 'Column 3',
              visible: true,
              pinnable: true,
              draggable: true,
            },
            {
              id: '4',
              title: 'Column 4',
              visible: true,
              pinnable: true,
              draggable: true,
            },
            {
              id: '2',
              title: 'Column 2',
              visible: true,
              pinnable: true,
              draggable: true,
              fixed: 'right',
            },
          ]);
        });
      });
    });
    describe('when "unpin" method is called', () => {
      it('pins column correctly ', async () => {
        const { result } = renderHook(() =>
          useColumns({
            defaultColumns: [
              { id: '1', label: 'Column 1', fixed: 'left' },
              { id: '2', label: 'Column 2' },
              { id: '3', label: 'Column 3' },
              { id: '4', label: 'Column 4' },
            ],
          }),
        );

        expect(result.current.getAntdTableColumns()).toEqual([
          {
            id: '1',
            title: 'Column 1',
            visible: true,
            pinnable: true,
            draggable: true,
            fixed: 'left',
          },
          { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
          { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
          { id: '4', title: 'Column 4', visible: true, pinnable: true, draggable: true },
        ]);

        act(() => {
          result.current.getColumns()[0].unpin();
        });

        act(() => {
          result.current.getApplyHandler()();
        });

        await waitFor(() => {
          expect(result.current.getAntdTableColumns()).toEqual([
            {
              id: '1',
              title: 'Column 1',
              visible: true,
              pinnable: true,
              draggable: true,
            },
            {
              id: '2',
              title: 'Column 2',
              visible: true,
              pinnable: true,
              draggable: true,
            },
            {
              id: '3',
              title: 'Column 3',
              visible: true,
              pinnable: true,
              draggable: true,
            },
            {
              id: '4',
              title: 'Column 4',
              visible: true,
              pinnable: true,
              draggable: true,
            },
          ]);
        });
      });
    });
  });
  describe('when "localStorage" is given', () => {
    it('returns columns from localStorage correctly', () => {
      localStorage.setItem(
        'key',
        JSON.stringify([
          { id: '2', title: 'Column 2', visible: true },
          { id: '1', title: 'Column 1', visible: true },
          { id: '3', title: 'Column 3', visible: true },
        ]),
      );

      const { result } = renderHook(() =>
        useColumns({
          localStorage: 'key',
          defaultColumns: [
            { id: '1', label: 'Column 1' },
            { id: '2', label: 'Column 2' },
            { id: '3', label: 'Column 3' },
          ],
        }),
      );

      expect(result.current.getAntdTableColumns()).toEqual([
        { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
        { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
        { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
      ]);
    });
    it('returns "defaultColumns" from the parameters if amount of columns changed ', () => {
      localStorage.setItem(
        'key',
        JSON.stringify([
          { id: '1', title: 'Column 1', visible: true },
          { id: '3', title: 'Column 3', visible: true },
        ]),
      );

      const { result } = renderHook(() =>
        useColumns({
          localStorage: 'key',
          defaultColumns: [
            { id: '1', label: 'Column 1' },
            { id: '2', label: 'Column 2' },
            { id: '3', label: 'Column 3' },
          ],
        }),
      );

      expect(result.current.getAntdTableColumns()).toEqual([
        { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
        { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
        { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
      ]);
    });
    it('returns "defaultColumns" from the parameters if id of some columns changed ', () => {
      localStorage.setItem(
        'key',
        JSON.stringify([
          { id: '4', title: 'Column 2', visible: true },
          { id: '1', title: 'Column 1', visible: true },
          { id: '3', title: 'Column 3', visible: true },
        ]),
      );

      const { result } = renderHook(() =>
        useColumns({
          localStorage: 'key',
          defaultColumns: [
            { id: '1', label: 'Column 1' },
            { id: '2', label: 'Column 2' },
            { id: '3', label: 'Column 3' },
          ],
        }),
      );

      expect(result.current.getAntdTableColumns()).toEqual([
        { id: '1', title: 'Column 1', visible: true, pinnable: true, draggable: true },
        { id: '2', title: 'Column 2', visible: true, pinnable: true, draggable: true },
        { id: '3', title: 'Column 3', visible: true, pinnable: true, draggable: true },
      ]);
    });
  });
});
