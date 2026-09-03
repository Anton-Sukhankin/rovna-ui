import { FileExtension, FileType, LiteralUnion } from '@rovna-ui/types';

import { Attachment } from './Attachment';
import { AttachmentStatus } from './AttachmentStatus';

export interface UploadFileEditing {
  /**
   * Метод для удаления вложения из списка
   */
  readonly remove: () => Promise<void> | void;
  /**
   * Метод для редактирования вложения
   */
  readonly edit: (attachment: Attachment) => Promise<void> | void;
  /**
   * Метод возвращает метод для удаления вложения
   */
  readonly getRemoveHandler: () => () => void;
  /**
   * Отвечает за возможность удалить вложение
   */
  readonly getCanRemove: () => boolean;
  /**
   * Отвечает за возможность редактировать вложение
   */
  readonly getCanEdit: () => boolean;
  readonly getCanDownload: () => boolean;
}
export interface UploadFileUploading {
  /**
   * Возвращает ссылку для скачивания вложения
   */
  readonly getSource: () => string | undefined;
  /**
   * Метод возвращает статус загрузки вложения
   */
  readonly getStatus: () => AttachmentStatus;
  /**
   * Метод возвращает сообщение загрузки вложения
   */
  readonly getMessage: () => string | undefined;
  /**
   * Метод возвращает прогресс загрузки вложения
   */
  readonly getProgress: () => number;
}

export interface UploadFile extends UploadFileEditing, UploadFileUploading {
  /**
   * Уникальный внутренний `uuid`
   */
  readonly uuid: string;
  /**
   * Вложение
   */
  readonly original: Attachment;
  /**
   * Наименование вложения
   */
  readonly name: string;
  /**
   * `Mime` тип вложения
   */
  readonly type: LiteralUnion<FileType> | null;
  /**
   * Расширение вложения
   */
  readonly extension: LiteralUnion<FileExtension> | null;
  /**
   * Метод возвращает валидность вложения
   */
  readonly getIsValid: () => boolean;
  /**
   * Метод возвращает недоступность
   */
  readonly getIsDisabled: () => boolean;
  readonly getOnClickHandler: () => () => void;
  readonly getCanClick: () => boolean;
}
