import React from 'react';

import { Table as PrimitiveTable, TableComponent } from '@rovna-internal/components/primitives/Table';

const Table = React.memo(PrimitiveTable) as TableComponent;

export { Table };
