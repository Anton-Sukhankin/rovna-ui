import React from 'react';
import {
  useCallbackRef,
  UNSTABLE_useControllableStateV2 as useControllableState,
} from '@rovna-ui/hooks';
import { clamp, isNumber } from '@rovna-ui/utils';

import { mapFileToAttachment } from '@rovna-internal/upload/core/utils/mapFileToAttachment';
import { Attachment } from '@rovna-internal/upload/core/interfaces';
import { UploadFile } from '@rovna-internal/upload/core/interfaces/UploadFile';
import { Upload, UseUploadParameters } from '@rovna-internal/upload/core/interfaces/Upload';

import { difference } from './utils';

export const useUpload = ({
  max,
  disabled = false,
  multiple = false,
  defaultValue,
  value,
  extensions,
  canEdit = () => false,
  canRemove = () => true,
  canDownload = () => true,
  canClick = () => true,
  onEdit,
  onRemove,
  onUpload,
  onChange,
  onItemClick,
}: UseUploadParameters): Upload => {
  const [__isMaxExceeded, __setIsMaxExceeded] = React.useState(false);
  const ref = React.useRef<HTMLInputElement>(null);
  const mounted = React.useRef(true);
  const uploaded = React.useRef(0);
  const [__files, __setFiles] = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  // По какой-то причине __files недоступен из функции __set
  // и всегда равен undefined
  // Нужно разобраться почему
  // Пока что подсчитываем количество загруженных файлов через костыль
  React.useEffect(() => {
    uploaded.current = (__files || []).length;
  });
  React.useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  const __edit = useCallbackRef((file: Attachment) => {
    const promise = onEdit?.(file);

    if (promise instanceof Promise === false) {
      __setFiles((p = []) => {
        return p.map(previous => (previous.uuid === file.uuid ? file : previous));
      });

      return;
    }

    return promise
      .then(payload => {
        if (!mounted.current) return;
        __setFiles((p = []) => {
          return p.map(previous => (previous.uuid === payload.uuid ? payload : previous));
        });
      })
      .catch(e => {
        throw e;
      });
  });
  const __remove = useCallbackRef((attachment: Attachment) => {
    const r = onRemove?.(attachment);

    if (r instanceof Promise === false) {
      __setFiles((p = []) => p.filter(previous => previous.uuid !== attachment.uuid));

      return;
    }

    return r
      .then(() => {
        if (!mounted.current) return;
        __setFiles((p = []) => p.filter(previous => previous.uuid !== attachment.uuid));
      })
      .catch(e => {
        throw e;
      });
  });

  const createUploadFile = React.useCallback(
    (attachment: Attachment): UploadFile => {
      return {
        uuid: attachment.uuid,
        name: attachment.name,
        original: attachment,

        type: attachment?.file?.type ?? null,
        extension: attachment?.extension ?? null,

        remove: () => __remove(attachment),
        edit: (payload: Attachment) => __edit(payload),
        getRemoveHandler: () => () => __remove(attachment),
        getCanRemove: () => canRemove(attachment),
        getCanEdit: () => canEdit(attachment),
        getCanDownload: () => canDownload(attachment),
        getCanClick: () => canClick(attachment),
        getOnClickHandler: () => () => {
          if (!canClick(attachment)) return;
          onItemClick?.(attachment);
        },

        getStatus: () => attachment.status ?? 'default',
        getMessage: () => attachment.message,
        getProgress: () => attachment.progress ?? 0,
        getSource: () => attachment.source,

        getIsDisabled: () => attachment.status === 'uploading',
        getIsValid: () =>
          extensions && attachment.extension
            ? extensions.includes(attachment.extension)
            : true,
      };
    },
    [
      __edit,
      __remove,
      canClick,
      canDownload,
      canEdit,
      canRemove,
      extensions,
      onItemClick,
    ],
  );

  const files = React.useMemo<UploadFile[]>(
    () => (__files || []).map(createUploadFile),
    [__files, createUploadFile],
  );

  const setProgress = useCallbackRef((uuid: string | string[], progress: number) => {
    if (!mounted.current) return;
    const clamped = clamp(progress, 0, 100);
    const status = clamped === 100 ? 'uploaded' : 'uploading';
    const uuids = Array.isArray(uuid) ? uuid : [uuid];
    __setFiles((previous = []) => {
      return previous.map(previousFile => {
        if (uuids.includes(previousFile.uuid))
          return { ...previousFile, status, progress };

        return previousFile;
      });
    });
  });
  const setMessage = useCallbackRef((uuid: string | string[], message: string) => {
    if (!mounted.current) return;
    const uuids = Array.isArray(uuid) ? uuid : [uuid];
    __setFiles((previous = []) => {
      return previous.map(previousFile => {
        if (uuids.includes(previousFile.uuid)) return { ...previousFile, message };

        return previousFile;
      });
    });
  });
  const setIsMaxExceeded = useCallbackRef((payload: boolean) => {
    __setIsMaxExceeded(payload);
  });

  const __set = React.useCallback(
    (payload: FileList | null) => {
      if (!payload || disabled) {
        if (!ref.current) return;
        ref.current.value = '';

        return;
      }

      const next = Array.from(payload)
        .map<Attachment>(mapFileToAttachment)
        .map<Attachment>(attachment => {
          if (!extensions || !attachment.extension) return attachment;
          if (!extensions.includes(attachment.extension))
            return { ...attachment, status: 'error', message: 'Неподдерживаемый формат' };

          return attachment;
        });

      if (isNumber(max) && uploaded.current === max) {
        if (!ref.current) return;
        ref.current.value = '';
        __setIsMaxExceeded(true);

        return;
      }

      __setFiles((previous = []) => [...previous, ...next]);

      const filtered = next.filter(attachment => {
        if (!extensions || !attachment.extension) return true;

        return extensions.includes(attachment.extension);
      });

      if (!filtered.length) {
        if (!ref.current) return;
        ref.current.value = '';

        return;
      }

      /**
       * Закидываем колбэк как асинхронную задачу
       * для того чтобы гарантировать обновление стейта
       * и получить актуальные значение в момент вызова setProgress
      */
      queueMicrotask(() => {
        if (!mounted.current || !onUpload) return;

        Promise.resolve()
          .then(() => onUpload(filtered, { setProgress, setMessage }))
          .then(updated => {
            if (!mounted.current) return updated;
            __setFiles((previous = []) => {
              return previous.map(current => {
                const patched = updated.find(updating => current.uuid === updating.uuid);
                if (patched) return difference(current, patched);

                return current;
              });
            });

            return updated;
          })
          .catch(() => {
            if (!mounted.current) return;
            __setFiles((previous = []) => {
              return previous.map(previous => ({ ...previous, status: 'error' }));
            });
          });
      });

      if (!ref.current) return;
      ref.current.value = '';
    },
    [__setFiles, disabled, extensions, max, onUpload, setMessage, setProgress],
  );

  const onInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      __set(e.target.files);
    },
    [__set],
  );

  /**
   * @description Открыть загрузчик
   */
  const open = useCallbackRef(() => {
    if (disabled) return;
    ref.current?.click?.();
  });
  const remove = useCallbackRef((uuid: string) => {
    if (disabled) return;
    __setFiles(previous => previous?.filter(attachment => attachment.uuid !== uuid));
  });
  const clear = useCallbackRef(() => {
    if (disabled) return;
    __setFiles([]);
  });
  const drop = useCallbackRef<React.DragEventHandler>(event => {
    event.preventDefault();
    event.stopPropagation();
    __set(event.dataTransfer.files);
  });
  /**
   * @description Свойства для <input type="file" />
   */
  const getInputProps = useCallbackRef<() => React.ComponentProps<'input'>>(() => ({
    style: { display: 'none' },
    ref,
    onChange: onInputChange,
    type: 'file',
    accept: extensions?.join(','),
    multiple,
  }));

  return {
    open,
    remove,
    clear,
    getOpenHandler: () => open,
    getRemoveHandler: () => remove,
    getClearHandler: () => clear,
    getOnDropHandler: () => drop,
    getFiles: () => files,
    getIsDisabled: () => disabled,
    getIsMaxExceeded: () => __isMaxExceeded,
    setIsMaxExceeded,
    getInputProps,
    setProgress,
    setMessage,
  };
};
