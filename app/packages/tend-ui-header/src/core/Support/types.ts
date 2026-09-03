import { Attachment } from '@rovna-ui/upload';

export type FormState = {
  module: string;
  criticality: string;
  title: string;
  description?: string;
  fio: string;
  role: string;
  email: string;
  phone?: string;
  files?: Attachment[];
  version?: string;
};

export type SupportProps = {
  alertText?: string;
  module?: string;
  moduleOptions: {
    value: string;
    label: string;
  }[];
  fio?: string;
  email?: string;
  maxFileSize?: number;
  version?: string;
  onSend: (state: FormState) => Promise<void>;
};
