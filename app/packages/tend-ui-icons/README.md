# @rovna-ui/icons

Набор иконок `10d`

# Установка

```sh
yarn add @rovna-ui/icons@latest
```

# Использование

```jsx
import { AccountBox } from '@rovna-ui/icons';


<AccountBox />
<AccountBox size={24} />
<AccountBox color="red"  />
<AccountBox color="blue100"  />
```

# Генерация иконок

1. Получить исходники `svg` файлов от дизайнера с корректным названием файлов
2. Положить исходники в директорию `src/svg`
3. Выполнить команду

```sh
yarn menu
```

4. Выбрать команду "Сгенерировать иконки"
