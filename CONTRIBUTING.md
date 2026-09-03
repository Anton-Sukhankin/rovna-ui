# Contributing to Rovna UI

Спасибо за вклад в Rovna UI. Основной язык пользовательского интерфейса и Storybook-примеров - русский. Технические идентификаторы, имена API и код остаются на английском.

## Границы проекта

- Работайте только с этим DS-only репозиторием. Внешние продуктовые проекты не входят в область изменений.
- Используйте локальные исходники и общедоступные npm/GitHub-источники.
- Не обращайтесь к закрытым корпоративным registry, GitLab, Nexus, Figma или внутренним API.
- Не публикуйте npm-пакеты и GitHub releases из pull request.
- Не добавляйте root `LICENSE`, пока владелец не выбрал лицензию и режим распространения.

## Локальная подготовка

Требуются Node из `.nvmrc`, Corepack и Yarn `1.22.15`.

```powershell
Set-Location app
corepack prepare yarn@1.22.15 --activate
yarn install --frozen-lockfile --ignore-scripts --non-interactive --registry https://registry.npmjs.org
```

Установка допускается только из публичного npm registry. Если локальный `app/node_modules` уже подготовлен, повторная установка для обычной проверки не требуется.

## Основные проверки

Из `app/`:

```powershell
npm run quality:ci:check
npm run lint -- --quiet
npm run test:ds-only
npm run storybook:local:build
npm run quality:r10
```

Полный набор и назначение команд описаны в `docs/maintainer-guide.md` и `docs/github-repository-settings.md`.

## Изменения компонентов

1. Сохраните публичный API или явно оформите его изменение по `docs/public-api-versioning-policy.md`.
2. Добавьте или обновите unit/integration-тесты.
3. Обновите Storybook stories, состояния и `play`-проверки для интерактивного поведения.
4. Пользовательские подписи, кнопки, сообщения и dropdown-элементы пишите по-русски.
5. Для сетевых, auth, realtime и service-сценариев используйте автономные mocks.
6. После изменения stories пересоберите Storybook и обновите связанные отчеты.
7. После изменения экспортов запустите генерацию документации: `npm run docs:r09:generate`.

## Pull request

- Делайте изменение узким и объясняйте его пользовательский эффект.
- Укажите выполненные проверки и известные ограничения.
- Не включайте `node_modules`, `storybook-static`, `release`, `tmp`, `.env`, ключи, токены и локальные кэши.
- Не обновляйте snapshot/baseline без проверки причины изменения.
- Не смешивайте изменение продукта-потребителя с изменением дизайн-системы.

Перед отправкой используйте шаблон pull request и убедитесь, что `git diff --cached --name-only` содержит только намеренно подготовленные файлы.
