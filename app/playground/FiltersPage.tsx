import React from 'react';

import { Button } from '@rovna-ui/primitives';

import { Filters } from '../packages/tend-ui-filters/src';

const Test = ({ _value, onReset }) => {
  const [value, setValue] = React.useState(_value);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Открыть
      </Button>
      <Button
        onClick={() => {
          setValue({ number: 'Hello', surname: 'World' });
        }}
      >
        Update
      </Button>
      <Filters
        value={value}
        onClose={React.useCallback(() => {
          setOpen(false);
        }, [])}
        onFilterValuesChange={React.useCallback((changed, values) => {
          console.log('[Filters][onFilterValuesChange]', values);
          setValue(values);
        }, [])}
        onFiltersReset={() => {
          // setValue({});
          onReset?.();
        }}
        open={open}
        filters={React.useMemo(
          () => [
            {
              key: 'number',
              id: 'number',
              name: 'number',
              label: 'Номер',
              component: {
                component: 'input',
              },
            },
            {
              key: 'name',
              id: 'name',
              name: 'name',
              label: 'Имя',
              component: {
                component: 'input',
              },
            },
            {
              key: 'surname',
              id: 'surname',
              name: 'surname',
              label: 'Фамилия',
              component: {
                component: 'input',
              },
            },
            {
              id: 'material',
              name: 'material',
              label: 'Материал',
              component: {
                component: 'async-checkbox',
                api: () => {
                  return new Promise(resolve => {
                    setTimeout(() => {
                      resolve({
                        results: [
                          { id: 1, name: 'Грунт' },
                          { id: 2, name: 'Цемент' },
                          { id: 3, name: 'Дерево' },
                          { id: 4, name: 'Дерево2' },
                          { id: 5, name: 'Дерево3' },
                          { id: 6, name: 'Дерево4' },
                          { id: 7, name: 'Дерево5' },
                        ],
                      });
                    }, 2000);
                  });
                },
              },
            },
          ],
          [],
        )}
      />
    </div>
  );
};

export const FiltersPage = () => {
  const [value, setValue] = React.useState({});
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Test
        _value={value}
        onReset={() => {
          setValue({ number: 'Test' });
        }}
      />
    </div>
  );
};
