import { StatusProps } from '@rovna-internal/components/components/Status/types';

export type InternalServerErrorProps = Omit<StatusProps, 'status'>;
