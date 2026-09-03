import React from 'react';
import { FileExtension, LiteralUnion } from '@rovna-ui/types';

import { Attachment } from './Attachment';
import { UploadFile } from './UploadFile';

export type OnUploadOptions = {
  /**
   * Функция обновления прогресса загрузки
   * @param id - `id` файла
   * @param progress - процент прогресса от 0 до 100
   */
  setProgress: (uuid: string | string[], progress: number) => void;
  setMessage: (uuid: string | string[], message: string) => void;
};

// TODO: Вынести в утилиты
export type NonUndefined<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: T[P] };

export type UseUploadParameters = {
  disabled?: boolean;
  /**
   * Множественная загрузка
   */
  multiple?: boolean;
  /**
   * Список файлов
   */
  value?: Attachment[];
  max?: number;
  /**
   * Разрешенные расширения для загрузки
   */
  extensions?: LiteralUnion<FileExtension>[];
  /**
   * Список файлов по умолчанию
   */
  defaultValue?: Attachment[];
  /**
   * Вызывается при удалении файла из списка
   */
  onRemove?: ((removed: Attachment) => void) | ((removed: Attachment) => Promise<void>);
  /**
   * Вызывается при редактировании файла в списке
   */
  onEdit?: ((edited: Attachment) => void) | ((edited: Attachment) => Promise<Attachment>);
  onChange?: (edited: Attachment[]) => void;
  /**
   * Вызывается при загрузке файла
   */
  onUpload?: (uploaded: Attachment[], options: OnUploadOptions) => Promise<Attachment[]>;
  /**
   * Вызывается при клике на файл
   */
  onItemClick?: (attachment: Attachment) => void;
  /**
   * Позволяет настраивать возможность удаления файла
   */
  canRemove?: (attachment: Attachment) => boolean;
  /**
   * Позволяет настраивать возможность редактирования файла
   */
  canEdit?: (attachment: Attachment) => boolean;
  /**
   * Позволяет настраивать возможность скачать файл
   */
  canDownload?: (attachment: Attachment) => boolean;
  /**
   * Позволяет настраивать возможность клика
   */
  canClick?: (attachment: Attachment) => boolean;
};

export type Upload = {
  /**
   * Функция открытия инспектора файлов
   */
  readonly open: () => void;
  /**
   * Функция удаления файла по uuid
   */
  readonly remove: (uuid: string) => void;
  /**
   * Функция удаления всех файлов
   */
  readonly clear: () => void;
  /**
   * Функция возвращающая функцию открытия загрузчика файлов
   */
  readonly getOpenHandler: () => () => void;
  readonly getRemoveHandler: () => (uuid: string) => void;
  readonly getClearHandler: () => () => void;
  readonly getOnDropHandler: () => React.DragEventHandler<HTMLElement>;
  /**
   * Массив моделей файлов
   */
  readonly getFiles: () => UploadFile[];
  readonly getIsDisabled: () => boolean;
  readonly getIsMaxExceeded: () => boolean;
  readonly setIsMaxExceeded: (payload: boolean) => void;
  /**
   * Функция возвращающая свойства для <input />
   */
  readonly getInputProps: () => React.ComponentProps<'input'>;
  readonly setProgress: (uuid: string | string[], progress: number) => void;
  readonly setMessage: (uuid: string | string[], message: string) => void;
};
