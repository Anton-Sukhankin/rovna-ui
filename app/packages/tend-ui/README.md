# Структура проекта

`types` - глобальные интерфейсы, контракты

`tokens` - цветовая палитра

`hooks` - хуки

`theme` - стилизация и темизация

`icons` - пакет иконок

`grid` - компоненты сетки

`typography` - типография

`primitives` - базовые строительные блоки, не реализующие никакой сложной логики

`components` - реализует какой-либо специфический UI функционал

`features` - реализует функционал, приносящий ценность конечному пользователю (`Profile`, `Notifications`, `Layout`, `Header`, `etc`)

`widgets` - полноценные, готовые к встраиванию компоненты-виджеты, включают в себя минимальную кастомизацию и максимальную бизнес-функциональность

## Граф зависимостей

Каждый следующий слой может импортировать из предыдущего

`types`
`utils`
`factories`
`api`
`locale`
`hooks`
`styling`
`theme`
`grid`
`icons`
`typography`
`ui`
`primitives`
`components`
`features`
`widgets`

# Рекомендации по использованию

:arrow_right: импортировать компоненты следует только через публичное API (`index.ts` файл) в рамках конкретного модуля. Это гарантирует консистентность и стабильность кода.

:white_check_mark: Хорошо

Импорт происходит через публичное API, нет директивного обращение в низкоуровневую реализацию

```tsx
import { Button } from '@rovna-ui/components/primitives';
import { Home } from '@rovna-ui/components/icons';
import { Profile } from '@rovna-ui/components/features';
import { useProfile } from '@rovna-ui/components/hooks';
import { withInjectedClassName } from '@rovna-ui/components/hocs';

import { Button } from '@rovna-ui/components/primitives/Button';
import { Home } from '@rovna-ui/components/icons/components/Home';
import { Profile } from '@rovna-ui/components/features/Profile';
import { useProfile } from '@rovna-ui/components/hooks/useProfile';
import { withInjectedClassName } from '@rovna-ui/components/hocs/withInjectedClassName';
```

:x: Плохо

Директивный импорт в низкоуровневую реализацию модуля. Стабильность такого импорта не гарантирована

```tsx
import { buttonBorderedCss } from '@rovna-ui/components/primitives/Button/components/styled';
import { useLayout } from '@rovna-ui/components/features/Layout/hooks';
import { PROFILE_TYPE } from '@rovna-ui/components/hooks/useProfile/constants';
```

:arrow_right: для оптимизации размера бандла и лучшего `tres-shaking` можно импортировать только необходимое

```tsx
import { Button } from '@rovna-ui/components/primitives/Button';
import { Tooltip } from '@rovna-ui/components/primitives/Tooltip';
import { Profile } from '@rovna-ui/components/features/Profile';
import { useProfile } from '@rovna-ui/components/hooks/useProfile';
```
