import React from 'react';
import {
  Checkbox,
  Dialog,
  Dropdown,
  DropdownItem,
  Tooltip,
} from '@rovna-ui/components/primitives';
import { CellContext } from '@tanstack/react-table';
import {
  useCallbackRef,
  useClickOutside,
  useHover,
  useKeyPress,
  UNSTABLE_useOverflown as useOverflown,
} from '@rovna-ui/hooks';
import { Text } from '@rovna-ui/typography';
import { MoreVert } from '@rovna-ui/icons/MoreVert';
import { Folder } from '@rovna-ui/icons/Folder';
import { Error } from '@rovna-ui/icons/Error';
import { Add } from '@rovna-ui/icons/Add';
import { Edit } from '@rovna-ui/icons/Edit';
import { File } from '@rovna-ui/icons/File';
import { Delete } from '@rovna-ui/icons/Delete';
import { useTheme } from '@rovna-ui/theme';
import { Spinner } from '@rovna-ui/primitives';
import { Box } from '@rovna-ui/grid';
import classnames from 'classnames';
import { isNumber } from '@rovna-ui/utils';

import { TreeData, TreeNode as TreeNodeType } from '@rovna-internal/tree/core/interfaces';

import { Input } from '../../ui/Input';
import { Root } from './styled';
import { ExpandButton } from './components/ExpandButton';
import { Indent } from './components/Indent';
import { PinButton } from './components/PinButton';
import { MetaType } from '../../types';
import { useNodeActionsAllowance } from './hooks/useNodeActionsAllowance';
import { useNodeAllowance } from './hooks/useNodeAllowance';
import { useNodeStatus } from './hooks/useNodeStatus';
import { useNodeType } from './hooks';

const overlayStyle = { minWidth: '156px' };

interface TreeNodeProps<T extends TreeData = TreeData> {
  context: CellContext<TreeNodeType<T>, string>;
}

const TreeNode = <T extends TreeData = TreeData>({ context }: TreeNodeProps<T>) => {
  const theme = useTheme();
  const ref = React.useRef<HTMLInputElement>(null);
  const root = React.useRef<HTMLDivElement>(null);
  const [value, setValue] = React.useState<string>(context.getValue);
  const [editing, setEditing] = React.useState(false);
  const [isNodeHovered, listeners] = useHover();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const key = context.row.id;
  const node = context.row.original;
  const meta = context.table.options.meta as MetaType<T>;

  const pinnable = meta.pinnable;
  const expandable = meta.expandable;
  const deletable = meta.deletable;
  const showCheckbox = meta.checkable;
  const selectedKey = meta.selectedKey;
  const __parent = meta.__parent;
  const ellipsis = meta.ellipsis;

  const checkboxTooltipProps = React.useMemo(
    () => meta.getNodeCheckboxTooltipProps?.(node),
    [meta, node],
  );
  const counter = meta.getNodeCounter?.(node);

  const nodeIconAfter = React.useMemo(() => meta.getNodeIconAfter?.(node), [meta, node]);

  const { canAddNode, canEditNode, canRemoveNode, canPinNode } = useNodeAllowance<
    TreeNodeType<T>
  >(context.row, meta);
  const { isError, isWarning, isSuccess, isInfo } = useNodeStatus<TreeNodeType<T>>(
    context.row,
    meta,
  );
  const { isBranch } = useNodeType<TreeNodeType<T>>(node);

  const {
    canCreateBranch,
    canCreateLeaf,
    canDeleteBranch,
    canDeleteLeaf,
    canEditBranch,
    canEditLeaf,
  } = useNodeActionsAllowance<T>(node);

  const isDotVisible = [isError, isWarning, isSuccess, isInfo].some(Boolean);

  const canPerformCreation = canAddNode && (canCreateBranch || canCreateLeaf);
  const canPerformEditing = canEditNode && (canEditBranch || canEditLeaf);
  const canPerformRemoving =
    deletable && canRemoveNode && (canDeleteBranch || canDeleteLeaf);

  const isValueEmpty = value === '';
  const isValueSame = value === context.getValue();
  const isNodeSelected = selectedKey === context.row.id;
  const isAllChildrenSelected = context.row.getIsAllSubRowsSelected();
  const isNodeChecked = context.row.getIsSelected();
  const isSomeSelected = context.row.getIsSomeSelected();
  const isNodePinned = !!context.row.getIsPinned();
  const isNodeCheckboxDisabled = meta.isNodeCheckboxDisabled?.(node);
  const canDropNode = meta.canDropNode?.(node);
  const isNodeDroppable = canDropNode && isBranch;
  const isNodeProjectionParent = __parent?.key === context.row.id;
  const isHighlighted = isNodeChecked || isNodeSelected || isNodeProjectionParent;
  const isDndError = !isNodeDroppable && isNodeProjectionParent;
  const hasCounter = isNumber(counter);
  const hasNodeIconAfter = !!nodeIconAfter;

  const save = useCallbackRef(() => {
    if (!editing || isValueSame || isValueEmpty) {
      setValue(context.getValue());
      setEditing(false);

      return;
    }
    const payload: TreeNodeType<T> = { ...node, value };
    meta.edit(payload);
    setEditing(false);
  });
  const cancel = useCallbackRef(() => {
    if (!editing || isValueSame) {
      setEditing(false);

      return;
    }
    setValue(context.getValue());
    setEditing(false);
  });

  const createFile = useCallbackRef(() => {
    meta.add(key, {
      key: Date.now().toString(),
      value: 'Новый файл',
    });
  });

  const createFolder = useCallbackRef(() => {
    meta.add(key, {
      key: Date.now().toString(),
      value: 'Новая папка',
      children: [],
    });
  });

  const remove = useCallbackRef(() => {
    Dialog.error({
      title: `Вы действительно хотите удалить "${context.cell.getValue()}"?`,
      okText: 'Да',
      cancelText: 'Нет',
      okButtonProps: { preset: 'danger', variant: 'ghost' },
      cancelButtonProps: { variant: 'primary', preset: 'default', danger: false },
      onOk: () => {
        meta.remove(key);
      },
    });
  });

  const actions = React.useMemo(
    () =>
      [
        canPerformCreation && {
          key: 'rovna-ui-tree-actions-create',
          label: 'Создать',
          icon: <Add />,
          children: [
            canCreateBranch && {
              key: 'rovna-ui-tree-actions-create-branch',
              label: 'Папку',
              icon: <Folder />,
              onClick: createFolder,
            },
            canCreateLeaf && {
              key: 'rovna-ui-tree-actions-create-leaf',
              label: 'Файл',
              icon: <File />,
              onClick: createFile,
            },
          ].filter(Boolean),
        },
        canPerformEditing && {
          key: 'rovna-ui-tree-actions-edit',
          label: 'Переименовать',
          icon: <Edit />,
          onClick: () => {
            setEditing(true);
            setTimeout(() => {
              ref.current?.focus();
            }, 0);
          },
        },
        canPerformRemoving && {
          key: 'rovna-ui-tree-actions-delete',
          label: 'Удалить',
          icon: <Delete />,
          onClick: remove,
        },
      ].filter(Boolean) as DropdownItem[],
    [
      canCreateBranch,
      canCreateLeaf,
      canPerformCreation,
      canPerformEditing,
      canPerformRemoving,
      createFile,
      createFolder,
      remove,
    ],
  );

  useClickOutside(ref, save);
  useKeyPress('Escape', cancel);
  useKeyPress('Enter', save);

  const nodeExtraActions = React.useMemo(
    () => meta.getNodeActions?.(node, { actions }),
    [actions, meta, node],
  );

  const items = React.useMemo(() => {
    if (nodeExtraActions) return nodeExtraActions;

    return actions;
  }, [actions, nodeExtraActions]);

  const hasExtraActions = (nodeExtraActions?.length || 0) > 0;

  const isPinned = context.row.getIsPinned();
  const isPinningButtonVisible = isPinned || isNodeHovered;
  const canPerformPinning = pinnable && canPinNode && isPinningButtonVisible;
  const canPerformActions =
    isNodeHovered &&
    [canPerformCreation, canPerformEditing, canPerformRemoving, hasExtraActions].some(
      Boolean,
    );
  const isExtraVisible = [
    canPerformActions,
    isDotVisible,
    pinnable,
    deletable,
    hasExtraActions,
    hasCounter,
    hasNodeIconAfter,
  ].some(Boolean);

  const handleNodeExpand = useCallbackRef((node: TreeNodeType<T>) => {
    meta.onNodeExpand?.(node);
    const r = meta.onNodeChildrenRequest(node);
    if (r instanceof Promise === false) return;

    setError(false);
    setLoading(true);
    r.catch(() => {
      setError(true);
    }).finally(() => {
      setLoading(false);
    });
  });

  const [isOverflown, connector] = useOverflown();
  const maxHeight = ellipsis ? '36px' : 'fit-content';

  return (
    <Root
      theme={theme}
      ref={root}
      $maxHeight={maxHeight}
      data-testid={`rovna-ui-tree-node-content-${key}`}
      className={classnames('rovna-ui-tree-node-content', {
        'rovna-ui-tree-node-content-hovered': isNodeHovered,
        'rovna-ui-tree-node-content-selected': isHighlighted,
        'rovna-ui-tree-node-content-pinned': isNodePinned,
        'rovna-ui-tree-node-content-error': isDndError,
      })}
      {...listeners}
    >
      {showCheckbox && (
        <Tooltip {...checkboxTooltipProps}>
          <Checkbox
            data-testid={`rovna-ui-tree-node-checkbox-${key}`}
            className='rovna-ui-tree-node-checkbox'
            aria-label={`Выбрать узел «${value}»`}
            disabled={isNodeCheckboxDisabled}
            checked={isNodeChecked || isAllChildrenSelected}
            indeterminate={isSomeSelected}
            onChange={context.row.getToggleSelectedHandler()}
          />
        </Tooltip>
      )}
      <Box $display='flex' $alignItems='center' $gap={8} $flex='1' $minWidth={0}>
        <Indent context={context} />
        {loading ? (
          <Spinner color={theme.colors.blue600} size='xs' />
        ) : error ? (
          <Tooltip title={`Не удалось загрузить данные`}>
            <Error color='red600' />
          </Tooltip>
        ) : (
          expandable && <ExpandButton context={context} onNodeExpand={handleNodeExpand} />
        )}
        {editing ? (
          <Input
            ref={ref}
            value={value}
            aria-label={`Название узла «${context.getValue()}»`}
            onChange={e => setValue(e.target.value)}
          />
        ) : (
          <Tooltip title={isOverflown ? value : undefined}>
            <Text ref={connector} ellipsis={ellipsis}>
              {value}
            </Text>
          </Tooltip>
        )}
        {isExtraVisible && (
          <Box $display='flex' $justifyContent='flex-end' $flex='1 0 auto' $gap={8}>
            {nodeIconAfter && (
              <Box $display='flex' $alignItems='center'>
                {nodeIconAfter}
              </Box>
            )}
            {canPerformPinning && <PinButton context={context} />}
            {canPerformActions ? (
              <Dropdown overlayStyle={overlayStyle} items={items}>
                <MoreVert color='gray500' />
              </Dropdown>
            ) : (
              hasCounter && <Text color='gray500'>{counter}</Text>
            )}
          </Box>
        )}
      </Box>
    </Root>
  );
};

TreeNode.displayName = 'TreeNode';

export { TreeNode };
