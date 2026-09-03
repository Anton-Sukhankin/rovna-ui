```diff
import { Table } from '@rovna-ui/components/primitives';
- import { ColumnsSettings, useColumns, useColumnsSettings } from '@rovna-ui/components/components';
+ import { DrawerColumnsSettings, useColumns } from '@rovna-ui/columns-settings';

- const [columns, model] = useColumns([{ key: '1', title: 'Title' }]);
- const properties = useColumnsSettings(model)
+ const settings = useColumns({
+  defaultColumns: [{ key: '1', label: 'Title' }]
+ });

- <Table columns={columns} />
+ <Table columns={settings.getAntdTableColumns()} />
- <ColumnsSettings
-   {...properties}
-   open={true}
-   onClose={() => {}}
- />;
+ <DrawerColumnsSettings
+   settings={settings}
+   open={true}
+   onClose={() => {}}
+ />;
```
