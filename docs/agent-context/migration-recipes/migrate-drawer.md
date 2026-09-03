# Migration Recipe: Drawer

## Evidence

- [Main Drawer passport](../component-passports/generated/rovna-ui-main-primitives-drawer.md)
- [Primitives Drawer passport](../component-passports/generated/rovna-ui-primitives-drawer.md)

## Sequence

1. Зафиксируйте trigger, placement, width, close actions, overlay click, Escape и unsaved-state policy.
2. Выберите main или separate primitives contract по подтвержденному import path.
3. Перенесите только open/close lifecycle, сохранив owner состояния в consumer.
4. Проверьте portal container, scroll lock, focus trap и возврат focus на trigger.
5. Добавьте loading/error/empty content states, если drawer содержит async data.
6. Проверьте mobile viewport, zoom 200-400%, длинный русский заголовок и footer actions.

## Stop Conditions

- закрытие теряет несохраненные данные без product decision;
- focus trap или focus return не работает;
- drawer конфликтует с другим portal/overlay;
- placement/width не укладываются в responsive boundary.

## Acceptance

- trigger, Escape, close button и overlay policy работают;
- focus и scroll возвращаются корректно;
- content не перекрывает footer и viewport;
- axe и target consumer checks проходят.
