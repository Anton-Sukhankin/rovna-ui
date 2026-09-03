import React from 'react';
import { Text } from '@rovna-ui/typography';
import {
  Dropdown,
  DropdownItem,
  DropdownItemType,
  Progress,
} from '@rovna-ui/components/primitives';
import { Input } from '@rovna-ui/base';
import { Spinner, Tooltip } from '@rovna-ui/primitives';
import {
  Attach,
  Close,
  DoneCircle,
  Edit,
  Error,
  MoreVert,
  Upload,
} from '@rovna-ui/icons';
import { Box } from '@rovna-ui/grid';
import { useCallbackRef, useClickOutside, useKeyPress } from '@rovna-ui/hooks';
import { useTheme } from '@rovna-ui/theme';
import { flatten } from '@rovna-ui/utils';

import { useUploadContext } from '@rovna-internal/upload/core/context';
import { Attachment, UploadFile } from '@rovna-internal/upload/core';

import { Button, List, ListItem } from './styled';

const OVERLAY_STYLES = { minWidth: '156px' };

const DoneIcon = () => {
  const [showDefaultIcon, setShowDefaultIcon] = React.useState(false);

  React.useEffect(() => {
    const uuid = setTimeout(() => {
      setShowDefaultIcon(true);
    }, 1500);

    return () => {
      clearTimeout(uuid);
    };
  }, []);

  return showDefaultIcon ? (
    <Attach size={20} color='gray5500' />
  ) : (
    <DoneCircle size={20} color='blue600' />
  );
};

const StatusIcon = ({ file }: { file: UploadFile }) => {
  switch (file.getStatus()) {
    case 'default':
      return <Attach size={20} color='gray5500' />;
    case 'uploading':
      return (
        <Progress
          aria-label={`Прогресс загрузки файла ${file.name}`}
          size={20}
          type='circle'
          percent={file.getProgress()}
        />
      );
    case 'uploaded':
      return <DoneIcon />;
    case 'error':
      return <Error size={20} color='red600' />;
    default:
      return <Attach size={20} color='gray500' />;
  }
};

const FilesItem = ({ file }: { file: UploadFile }) => {
  const theme = useTheme();
  console.log('File Status', file.getStatus());
  const ref = React.useRef<HTMLInputElement>(null);
  const [url] = React.useState<string>(() => {
    if (file.original.source) return file.original.source;
    if (file.original.file) return URL.createObjectURL(file.original.file);

    return '';
  });
  const [value, setValue] = React.useState<string>(file.name);
  const [editing, setEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const context = useUploadContext('FilesList.Item');
  const disabled = file.getIsDisabled();
  const before = context.getAttachmentBefore ? (
    context.getAttachmentBefore(file.original)
  ) : (
    <StatusIcon file={file} />
  );
  const after = context.getAttachmentAfter
    ? context.getAttachmentAfter(file.original)
    : null;

  const isValueEmpty = value === '';
  const isValueSame = value === file.name;
  const name = [file.name, file.extension].join('');

  const save = React.useCallback(() => {
    if (!editing || isValueSame || isValueEmpty) {
      setValue(file.name);
      setEditing(false);

      return;
    }
    const payload: Attachment = { ...file.original, name: value };
    const r = file.edit(payload);
    if (r instanceof Promise === false) {
      setEditing(false);

      return;
    }

    setLoading(true);
    r.finally(() => {
      setEditing(false);
      setLoading(false);
    });
  }, [editing, file, isValueEmpty, isValueSame, value]);

  const remove = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      const r = file.remove();
      if (r instanceof Promise === false) {
        return;
      }

      setLoading(true);
      r.finally(() => {
        setLoading(false);
      });
    },
    [file],
  );

  const cancel = useCallbackRef(() => {
    if (!editing || isValueSame) {
      setEditing(false);

      return;
    }
    setValue(file.name);
    setEditing(false);
  });

  useClickOutside(ref, save);
  useKeyPress('Escape', cancel);
  useKeyPress('Enter', save);

  const canEdit = file.getCanEdit();
  const canRemove = file.getCanRemove();
  const canDownload = file.getCanDownload();

  const actions = React.useMemo<DropdownItem[]>(
    () =>
      [
        canEdit && {
          key: 'rovna-ui-upload-actions-edit',
          label: 'Переименовать',
          icon: <Edit />,
          onClick: () => {
            setEditing(true);
            setTimeout(() => {
              ref.current?.focus();
            }, 0);
          },
        },
        canDownload && {
          key: 'rovna-ui-upload-actions-download',
          label: (
            <a href={url} download={file.name}>
              Скачать
            </a>
          ),
          icon: <Upload size={16} />,
        },
      ].filter(item => typeof item === 'object'),
    [canEdit, canDownload, file.name, url],
  );

  const nodeExtraActions = React.useMemo(
    () => context.getAttachmentActions?.(file.original, { actions }),
    [actions, context, file.original],
  );

  const items = React.useMemo(() => {
    if (nodeExtraActions) return nodeExtraActions;

    return actions;
  }, [actions, nodeExtraActions]);

  const hasOneAction = flatten(items).length === 1;
  const filtered = items.filter(
    (action): action is DropdownItemType => 'onClick' in action,
  );
  const action = filtered.at(0);
  const hasActions = items.length > 0;

  const isDefault = file.getStatus() === 'default';
  const isUploaded = file.getStatus() === 'uploaded';

  const canPerformActions = [
    isDefault || isUploaded,
    canEdit || canDownload,
    hasActions,
  ].every(Boolean);

  React.useEffect(() => {
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [url]);

  const cursor = file.getCanClick() ? 'pointer' : undefined;

  return (
    <ListItem
      theme={theme}
      onClick={React.useCallback(
        event => {
          const target = event.target;
          const isElement = target instanceof HTMLElement;
          const isSvg = target instanceof SVGElement;
          if (!(isElement || isSvg)) return;
          const after = target.closest('.rovna-ui-upload-list-item-after');
          const before = target.closest('.rovna-ui-upload-list-item-before');
          if (after || before) return;
          const parent = target.closest('li');
          if (!parent?.classList.contains('rovna-ui-upload-list-item')) return;
          file.getOnClickHandler()();
        },
        [file],
      )}
      className='rovna-ui-upload-list-item'
      style={{ cursor }}
    >
      <Box className='rovna-ui-upload-list-item-before'>
        {loading ? <Spinner color='blue600' size='xs' /> : before}
      </Box>
      <Box className='rovna-ui-upload-list-item-content' $flex={1}>
        {editing ? (
          <Box $display='flex' $alignItems='center'>
            <Input
              ref={ref}
              value={value}
              disabled={loading}
              onChange={e => setValue(e.target.value)}
            />
            <Text>{file.extension}</Text>
          </Box>
        ) : (
          <>
            <Text style={{ display: 'block' }}>{name}</Text>
          </>
        )}
        {file.getMessage() && (
          <Text
            role='alert'
            size='small'
            color='red600'
            style={{ display: 'block' }}
          >
            {file.getMessage()}
          </Text>
        )}
      </Box>
      {after && <Box className='rovna-ui-upload-list-item-after'>{after}</Box>}
      <Box
        className='rovna-ui-upload-list-item-actions'
        $display='flex'
        $justifyContent='flex-end'
        $gap={8}
      >
        {canPerformActions &&
          (hasOneAction ? (
            action && (
              <Button
                aria-label={
                  typeof action.label === 'string'
                    ? action.label
                    : `Действие с файлом ${name}`
                }
                type='button'
                onClick={e => {
                  e.stopPropagation();
                  action.onClick?.({ domEvent: e });
                }}
              >
                {action.icon ?? action.label}
              </Button>
            )
          ) : (
            <Dropdown trigger={['click']} overlayStyle={OVERLAY_STYLES} items={items}>
              <Button
                aria-label={`Действия с файлом ${name}`}
                type='button'
                onClick={e => e.stopPropagation()}
              >
                <MoreVert color='gray500' />
              </Button>
            </Dropdown>
          ))}
        {canRemove && (
          <Tooltip title='Удалить'>
            <Button
              aria-label={`Удалить файл ${name}`}
              className='rovna-ui-upload-list-remove-button'
              disabled={disabled}
              role='button'
              type='button'
              onClick={remove}
            >
              <Close size={16} color='gray400' />
            </Button>
          </Tooltip>
        )}
      </Box>
    </ListItem>
  );
};

const FilesList = () => {
  const upload = useUploadContext('Upload.FilesList');

  return upload.getFiles().length ? (
    <List className='rovna-ui-upload-list'>
      {upload.getFiles().map(file => (
        <FilesItem key={file.uuid} file={file} />
      ))}
    </List>
  ) : null;
};

FilesList.displayName = 'Upload.FilesList';

export { FilesList };
