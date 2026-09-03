import { v4 as uuidv4 } from 'uuid';
import { extension, name } from '@rovna-ui/utils';

import { Attachment } from '@rovna-internal/upload/core/interfaces';

export const mapFileToAttachment = (file: File): Attachment => ({
  uuid: uuidv4(),
  name: name(file.name),
  extension: extension(file.name),
  type: file.type ?? null,
  file,
});
