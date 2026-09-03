# Migration Recipe: Form

## Evidence

- [Main Form passport](../component-passports/generated/rovna-ui-main-components-form.md)
- [Primitives Form passport](../component-passports/generated/rovna-ui-primitives-form.md)
- [Separate package Form passport](../component-passports/generated/rovna-ui-form-form.md)

## Sequence

1. Зафиксируйте поля, initial values, validation rules, submit/reset и server-error states исходной формы.
2. Выберите один Form contract и не смешивайте main, primitives и separate package APIs без доказанной причины.
3. Оберните consumer в `RovnaUI`, подключите только одно поле и подтвердите label, description, required и error semantics.
4. Перенесите controlled values и validation без изменения бизнес-правил.
5. Сохраните native submit semantics, loading/disabled actions и focus на первом invalid field.
6. Добавьте local async fixture для success/error/timeout, если форма отправляет данные.
7. Проверьте keyboard order, accessible names, error announcement и длинный русский текст.

## Stop Conditions

- API требует закрытого endpoint без локального adapter;
- validation behavior не представлено story/test evidence;
- миграция меняет payload или business rule;
- focus/error semantics нельзя подтвердить.

## Acceptance

- default, filled, invalid, submitting, success и server-error states доказаны;
- submit/reset вызываются ровно один раз;
- закрытые network requests равны нулю;
- consumer и Storybook evidence IDs приложены к результату.
