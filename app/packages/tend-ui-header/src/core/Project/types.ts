import { ApiListResponse, LabeledOption, RawOption } from '@rovna-ui/types';
import { ApiOptions } from '@rovna-ui/components/hooks';
import { CSSProperties } from 'react';

type GenericData = {
  id: string | number;
  name: string;
};

type DividerOption = { type: 'divider' };
export type ProjectRawOption = RawOption;
export type ProjectLabeledOption = LabeledOption;
export type ProjectOption = ProjectRawOption | ProjectLabeledOption | DividerOption;
export type ProjectProps = {
  api: ApiOptions<ApiListResponse<GenericData>>;
  defaultValue?: ProjectOption[];
  value?: ProjectOption[];
  options?: (options: ProjectOption[]) => ProjectOption[];
  onChange?: (value: ProjectOption[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform?: (data: any) => ProjectLabeledOption;
  searchable?: boolean;
  overlayStyle?: CSSProperties;
};
