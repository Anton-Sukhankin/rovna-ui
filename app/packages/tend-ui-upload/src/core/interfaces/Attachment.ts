import { AttachmentStatus } from './AttachmentStatus';

interface BaseAttachment {
  /**
   * Внутренний Внешний уникальный `id` файла. Создается компонентом
   */
  uuid: string;
  /**
   * Название файла
   */
  name: string;
  /**
   * Расширение файла
   */
  extension?: string | null;
  /**
   * Тип файла
   */
  type?: string | null;
}

export interface Attachment extends BaseAttachment {
  /**
   * Нативный объект `File` javascript
   */
  file?: File;
  /**
   * Статус загрузки
   */
  status?: AttachmentStatus;
  /**
   * Сообщение об ошибке
   */
  message?: string;
  /**
   * Прогресс загрузки
   */
  progress?: number;
  /**
   * Ссылка для скачивания
   */
  source?: string;
}
