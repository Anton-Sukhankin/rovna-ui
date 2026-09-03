import { useSortable } from '@dnd-kit/sortable';
import { contextFactory } from '@rovna-ui/factories';

type UseSortableReturn = ReturnType<typeof useSortable>;
type ColumnsSettingContextType = Pick<
  UseSortableReturn,
  'listeners' | 'attributes' | 'setActivatorNodeRef'
>;

/**
 * @internal Not for public usage
 */
export const [ColumnsSettingContext, useColumnsSettingContext] =
  contextFactory<ColumnsSettingContextType>();
