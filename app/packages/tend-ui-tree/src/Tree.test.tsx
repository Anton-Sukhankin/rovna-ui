import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import { snapshotWithTheme } from '../../tend-ui/src/tools/snapshotWithTheme';
import { Tree, TreeNode } from '.';

let defaultNodes: TreeNode[] = [];

beforeEach(() => {
  defaultNodes = [
    {
      key: '1',
      value: 'Node 1',
      children: [
        { key: '2', value: 'Node 2', children: [{ key: '3', value: 'Node 3' }] },
      ],
    },
    {
      key: '4',
      value: 'Node 4',
      children: [
        { key: '5', value: 'Node 5', children: [{ key: '6', value: 'Node 6' }] },
      ],
    },
  ];
});

describe('Tree', () => {
  it('renders correctly', async () => {
    const snap = snapshotWithTheme(<Tree defaultNodes={defaultNodes} />);
    expect(snap).toMatchSnapshot();
  });
  describe('when "searchable" is "false"', () => {
    it('renders without "Search" correctly', () => {
      const snap = snapshotWithTheme(
        <Tree searchable={false} defaultNodes={defaultNodes} />,
      );
      expect(snap).toMatchSnapshot();
      const renderer = render(<Tree searchable={false} defaultNodes={defaultNodes} />);
      expect(renderer.queryByTestId('rovna-ui-tree-search')).not.toBeInTheDocument();
    });
  });
  describe('when "checkable" is "false"', () => {
    it('renders without checkboxes correctly', () => {
      const snap = snapshotWithTheme(
        <Tree searchable={false} defaultNodes={defaultNodes} />,
      );
      expect(snap).toMatchSnapshot();
      const renderer = render(<Tree checkable={false} defaultNodes={defaultNodes} />);
      expect(renderer.queryAllByTestId('rovna-ui-tree-checkbox').length).toBe(0);
    });
  });
  describe('when "expandable" is "false"', () => {
    it('renders without checkboxes correctly', () => {
      const snap = snapshotWithTheme(
        <Tree expandable={false} defaultNodes={defaultNodes} />,
      );
      expect(snap).toMatchSnapshot();
      const renderer = render(<Tree expandable={false} defaultNodes={defaultNodes} />);
      expect(renderer.queryAllByTestId(/rovna-ui-tree-node-expand-button/).length).toBe(0);
    });
  });
  describe('when "deletable" is given', () => {
    describe('and some nodes are checked', () => {
      it('renders "DeleteButton" in the footer correctly', async () => {
        const renderer = render(<Tree deletable defaultNodes={defaultNodes} />);
        expect(
          renderer.queryByTestId('rovna-ui-tree-delete-button'),
        ).not.toBeInTheDocument();

        const checkbox_1 = renderer.getByTestId(/rovna-ui-tree-node-checkbox-1/);

        act(() => {
          fireEvent.click(checkbox_1);
        });

        await waitFor(() => {
          expect(
            renderer.queryByTestId('rovna-ui-tree-delete-button'),
          ).toBeInTheDocument();
        });
      });

      describe('and "footer" is given', () => {
        it('do not render "Delete Button"', () => {
          const renderer = render(
            <Tree deletable defaultNodes={defaultNodes} footer={null} />,
          );
          expect(
            renderer.queryByTestId('rovna-ui-tree-delete-button'),
          ).not.toBeInTheDocument();

          const checkbox_1 = renderer.getByTestId(/rovna-ui-tree-node-checkbox-1/);

          act(() => {
            fireEvent.click(checkbox_1);
          });

          expect(
            renderer.queryByTestId('rovna-ui-tree-delete-button'),
          ).not.toBeInTheDocument();
        });
      });
    });
  });
  describe('isNodeCheckboxDisabled', () => {
    describe('when returns "false"', () => {
      it('renders with disabled checkboxes correctly', () => {
        const snap = snapshotWithTheme(
          <Tree searchable={false} defaultNodes={defaultNodes} />,
        );
        expect(snap).toMatchSnapshot();

        const renderer = render(
          <Tree isNodeCheckboxDisabled={() => true} defaultNodes={defaultNodes} />,
        );

        renderer.getAllByTestId(/rovna-ui-tree-node-checkbox/).forEach(node => {
          expect(node).toBeDisabled();
        });
      });
    });
  });
  describe('canAddNode', () => {
    it('when returns "true" can edit node', async () => {
      const renderer = render(
        <Tree canAddNode={() => true} defaultNodes={defaultNodes} />,
      );

      expect(renderer.queryByTestId('rovna-ui-more-vert-icon')).not.toBeInTheDocument();

      act(() => {
        fireEvent.mouseOver(renderer.getByTestId('rovna-ui-tree-node-content-1'));
      });

      await waitFor(() => {
        expect(renderer.queryByTestId('rovna-ui-more-vert-icon')).toBeInTheDocument();
      });

      act(() => {
        fireEvent.mouseOver(renderer.getByTestId('rovna-ui-more-vert-icon'));
      });

      expect(await renderer.findByText(/Создать/)).toBeInTheDocument();
    });
  });
  describe('getNodeCheckboxTooltipProps', () => {
    describe('when returns custom "title"', () => {
      it('renders disabled checkbox with hint correctly', async () => {
        const snap = snapshotWithTheme(
          <Tree searchable={false} defaultNodes={defaultNodes} />,
        );
        expect(snap).toMatchSnapshot();

        const renderer = render(
          <Tree
            isNodeCheckboxDisabled={() => true}
            getNodeCheckboxTooltipProps={() => ({ title: 'Some tooltip text' })}
            defaultNodes={defaultNodes}
          />,
        );

        act(() => {
          fireEvent.mouseOver(renderer.getByTestId(/rovna-ui-tree-node-checkbox-1/));
        });

        const tooltipText = await renderer.findByText('Some tooltip text');
        expect(tooltipText).toBeInTheDocument();
      });
    });
  });
  describe('given "defaultExpandedKeys"', () => {
    it('renders correctly', async () => {
      const snap = snapshotWithTheme(
        <Tree defaultNodes={defaultNodes} defaultExpandedKeys={['1', '4']} />,
      );
      expect(snap).toMatchSnapshot();
    });
  });
  describe('given "defaultCheckedKeys"', () => {
    it('renders correctly', async () => {
      const snap = snapshotWithTheme(
        <Tree defaultNodes={defaultNodes} defaultCheckedKeys={['1', '4']} />,
      );
      expect(snap).toMatchSnapshot();
    });
  });
  describe('given "defaultPinnedKeys"', () => {
    it('renders correctly', async () => {
      const snap = snapshotWithTheme(
        <Tree defaultNodes={defaultNodes} defaultPinnedKeys={['1', '4']} />,
      );
      expect(snap).toMatchSnapshot();
    });
  });
  describe('checking', () => {
    describe('when parent checkbox is clicked', () => {
      it('checks all children nodes correctly', async () => {
        const onCheckMock = jest.fn();

        const renderer = render(
          <Tree defaultNodes={defaultNodes} onCheck={onCheckMock} />,
        );
        const checkbox_1 = renderer.getByTestId(/rovna-ui-tree-node-checkbox-1/);

        act(() => {
          fireEvent.click(checkbox_1);
        });

        await waitFor(() => {
          expect(onCheckMock).toHaveBeenLastCalledWith(['1', '2', '3']);
        });
      });
    });
    describe('when node checkbox is clicked', () => {
      it('checks node correctly', async () => {
        const onCheckMock = jest.fn();
        const renderer = render(
          <Tree
            defaultNodes={defaultNodes}
            defaultExpandedKeys={['1', '2', '3', '4', '5']}
            onCheck={onCheckMock}
          />,
        );
        const checkbox_3 = renderer.getByTestId(/rovna-ui-tree-node-checkbox-3/);

        act(() => {
          fireEvent.click(checkbox_3);
        });

        await waitFor(() => {
          expect(onCheckMock).toHaveBeenLastCalledWith(['3']);
        });
      });
    });
  });
  describe('expanding', () => {
    describe('when "ExpandButton" is clicked', () => {
      it('expand row correctly', async () => {
        const onClick = jest.fn();
        const onExpand = jest.fn();
        const renderer = render(
          <Tree defaultNodes={defaultNodes} onExpand={onExpand} onClick={onClick} />,
        );
        const expandButton_1 = renderer.getByTestId(/rovna-ui-tree-node-expand-button-1/);

        act(() => {
          fireEvent.click(expandButton_1);
        });

        await waitFor(() => {
          expect(onExpand).toHaveBeenLastCalledWith(['1']);
          /**
           * Ожидаем, что клик на кнопка не должен триггерить клик по узлу
           */
          expect(onClick).not.toHaveBeenCalled();
        });
      });
    });
  });
  describe('when row is clicked', () => {
    it('executes "onClick" correctly', async () => {
      const onClick = jest.fn();
      const renderer = render(<Tree onClick={onClick} defaultNodes={defaultNodes} />);

      act(() => {
        fireEvent.click(renderer.getByTestId(/rovna-ui-tree-node-1/));
      });

      const content = renderer.getByTestId(/rovna-ui-tree-node-1/)
        .firstChild as HTMLElement;

      await waitFor(() => {
        expect(onClick).toHaveBeenLastCalledWith(defaultNodes[0]);
        expect(content.classList).toContain('rovna-ui-tree-node-content-selected');
      });
    });
    it('executes "onSelect" correctly', async () => {
      const onSelect = jest.fn();
      const renderer = render(<Tree onSelect={onSelect} defaultNodes={defaultNodes} />);

      act(() => {
        fireEvent.click(renderer.getByTestId(/rovna-ui-tree-node-1/));
      });

      const content = renderer.getByTestId(/rovna-ui-tree-node-1/)
        .firstChild as HTMLElement;

      await waitFor(() => {
        expect(onSelect).toHaveBeenLastCalledWith(defaultNodes[0]);
        expect(content.classList).toContain('rovna-ui-tree-node-content-selected');
      });
    });
    it('executes "onNodeClick" correctly', async () => {
      const onNodeClick = jest.fn();
      const renderer = render(
        <Tree onNodeClick={onNodeClick} defaultNodes={defaultNodes} />,
      );

      act(() => {
        fireEvent.click(renderer.getByTestId(/rovna-ui-tree-node-1/));
      });

      const content = renderer.getByTestId(/rovna-ui-tree-node-1/)
        .firstChild as HTMLElement;

      await waitFor(() => {
        expect(onNodeClick).toHaveBeenLastCalledWith(defaultNodes[0]);
        expect(content.classList).toContain('rovna-ui-tree-node-content-selected');
      });

      act(() => {
        fireEvent.click(renderer.getByTestId(/rovna-ui-tree-node-1/));
      });

      await waitFor(() => {
        expect(onNodeClick).toHaveBeenLastCalledWith(defaultNodes[0]);
        expect(content.classList).toContain('rovna-ui-tree-node-content-selected');
      });
    });
  });
  describe('when "footer" is given', () => {
    it('renders correctly', () => {
      const snap = snapshotWithTheme(
        <Tree defaultNodes={defaultNodes} footer={<div>Hello Footer</div>} />,
      );
      expect(snap).toMatchSnapshot();

      const renderer = render(
        <Tree defaultNodes={defaultNodes} footer={<div>Hello Footer</div>} />,
      );

      expect(renderer.getByText(/Hello Footer/)).toBeInTheDocument();
    });
  });
  describe('when "canExpandNode" is given', () => {
    it('renders correctly', () => {
      const component = (
        <Tree
          defaultNodes={[{ key: '1', value: 'Node 1', children: [] }]}
          canExpandNode={node => Array.isArray(node.children)}
        />
      );

      const snap = snapshotWithTheme(component);
      expect(snap).toMatchSnapshot();
      const renderer = render(component);
      expect(renderer.getByTestId('rovna-ui-folder-add-icon')).toBeInTheDocument();
    });
  });
  describe.each(['error'] as const)('when "getNodeStatus" is given %s', status => {
    it('renders correctly', () => {
      const component = (
        <Tree
          defaultNodes={[{ key: '1', value: 'Node 1', children: [] }]}
          getNodeStatus={() => status}
        />
      );

      const snap = snapshotWithTheme(component);
      expect(snap).toMatchSnapshot();
      const renderer = render(component);
      expect(renderer.getByTestId('rovna-ui-dot')).toBeInTheDocument();
    });
  });
  describe('when "pinnable" is "true"', () => {
    it('renders with pin buttons correctly', async () => {
      const renderer = render(<Tree pinnable defaultNodes={defaultNodes} />);

      act(() => {
        fireEvent.mouseEnter(renderer.getByTestId('rovna-ui-tree-node-content-1'));
        fireEvent.mouseEnter(renderer.getByTestId('rovna-ui-tree-node-content-4'));
      });

      await waitFor(() => {
        expect(renderer.queryAllByTestId(/rovna-ui-tree-node-pin-button/)).toHaveLength(2);
      });
    });

    it('pins a row without triggering the row click', async () => {
      const onClick = jest.fn();
      const onPin = jest.fn();
      const renderer = render(
        <Tree pinnable defaultNodes={defaultNodes} onPin={onPin} onClick={onClick} />,
      );

      act(() => {
        fireEvent.mouseEnter(renderer.getByTestId('rovna-ui-tree-node-content-1'));
      });

      const pinButton = await renderer.findByTestId('rovna-ui-tree-node-pin-button-1');

      act(() => {
        fireEvent.click(pinButton);
      });

      await waitFor(() => {
        expect(onPin).toHaveBeenLastCalledWith(['1']);
        expect(onClick).not.toHaveBeenCalled();
      });
    });
  });
  describe('accessibility semantics', () => {
    it('uses tree semantics and names interactive controls', () => {
      const renderer = render(<Tree defaultNodes={defaultNodes} />);

      expect(renderer.getByRole('tree', { name: 'Дерево' })).toBeInTheDocument();
      expect(renderer.getAllByRole('treeitem')).toHaveLength(2);
      expect(
        renderer.getByRole('textbox', { name: 'Поиск по дереву' }),
      ).toBeInTheDocument();
      expect(
        renderer.getByRole('checkbox', { name: 'Выбрать узел «Node 1»' }),
      ).toBeInTheDocument();
      expect(
        renderer.getByRole('button', { name: 'Развернуть узел «Node 1»' }),
      ).toHaveAttribute('aria-expanded', 'false');

      renderer.getAllByTestId(/rovna-ui-tree-node-\d+$/).forEach(node => {
        expect(node).toHaveAttribute('role', 'treeitem');
        expect(node).toHaveAttribute('tabindex', '0');
        expect(node).toHaveAttribute('aria-level', '1');
      });
    });

    it('keeps a draggable row exposed as a tree item', () => {
      const renderer = render(<Tree draggable defaultNodes={defaultNodes} />);
      const row = renderer.getByTestId('rovna-ui-tree-node-1');

      expect(row).toHaveAttribute('role', 'treeitem');
      expect(row).toHaveAttribute('tabindex', '0');
      expect(
        renderer.getByRole('button', { name: 'Развернуть узел «Node 1»' }),
      ).toBeInTheDocument();
    });
  });
});
