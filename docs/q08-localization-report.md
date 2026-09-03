# QG-08: Локализация и пользовательский текст

## Итог

Статус: `[x] passed`.

Русский язык закреплен как основной для Storybook и пользовательских состояний Tend UI. Английский разрешен только для технических контрактов и восьми явно перечисленных internationalization stories.

## Результаты

| Проверка | Объем | Результат |
| --- | ---: | ---: |
| Статический аудит stories | 112 файлов | 0 findings |
| Runtime DOM-аудит | 949 stories | 949 audited, 0 failures |
| Английский UI-текст | 949 stories | 0 findings |
| Mojibake/ошибки кодировки | 949 stories | 0 findings |
| Faker | все story-файлы | не используется |
| Day.js | Storybook preview | `dayjs.locale('ru')` установлен |
| Allowlist | i18n stories | 8 обоснованных исключений |

Runtime-аудит включает результат встроенного `play`, поэтому проверяет dropdown/menu options, placeholders, tooltips, validation, notifications и async/error/empty/loading состояния после взаимодействия. Зафиксированное предупреждение implicit Storybook action не относится к языку и не создало языкового finding.

## Правила

- Основная locale: `ru-RU`.
- Основной язык пользовательского текста: русский.
- Детерминированные локальные fixtures обязательны; случайный Faker-контент не используется.
- Любое новое английское исключение требует записи с причиной в `docs/storybook-language-allowlist.json`.
- Проверка выполняется без корпоративных источников и внешних API.

Машинные доказательства: `docs/q08-static-language-report.json` и `docs/q08-runtime-language-report.json`.
