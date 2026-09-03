import React from 'react';
import { DropdownItem } from '@rovna-ui/components/primitives';

import { Attachment } from './Attachment';

type Options = {
  /**
   * Дефолтные действия дерева
   */
  readonly actions: DropdownItem[];
};

export interface CoreLayoutProps {
  /**
   * Возвращает контент перед название файла
   */
  getAttachmentBefore?: (attachment: Attachment) => React.ReactNode;
  /**
   * Возвращает контент после названия файла
   */
  getAttachmentAfter?: (attachment: Attachment) => React.ReactNode;
  /**
   * Возвращает набор действий
   */
  getAttachmentActions?: (attachment: Attachment, options: Options) => DropdownItem[];
}
