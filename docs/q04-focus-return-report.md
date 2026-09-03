# Q-04.7: возврат фокуса

Дата проверки: 5 августа 2026 года.

## Итог

Проверены Modal, две доступные реализации Drawer и все четыре Popover stories в локальной статической сборке Storybook.

| Область | Story | Статус | Результат |
| --- | --- | --- | --- |
| Modal | `tend-ui-main-primitives-modal--large` | passed | После закрытия по Escape focus вернулся на кнопку «Открыть». |
| Drawer main, deprecated | `tend-ui-main-primitives-drawer--default` | passed | После Escape и завершения transition focus вернулся на trigger. |
| Drawer primitives, recommended | `tend-ui-primitives-drawer--full-screen` | passed | После Escape и завершения transition focus вернулся на trigger. |
| Popover | все 4 stories | blocked | Trigger — `span` без `role` и `tabindex`; keyboard cycle нельзя начать. |

`Q-04.7` получает статус `[!]`: проверка выполнена, но общий критерий не закрыт из-за Popover.

## Popover blocker

Во всех текущих Popover stories дочерний элемент задан строкой «Наведи на меня». В runtime она превращается в нефокусируемый `span`. Это не доказывает дефект внутреннего focus-return механизма Popover, но оставляет его непроверенным и одновременно делает демонстрационные stories недоступными с клавиатуры.

Зарегистрирован `QBUG-047-01` с severity P2. Для устранения белой области требуется нейтральная story с нативной Button в роли trigger и assertions:

1. trigger получает focus;
2. Popover открывается с клавиатуры;
3. закрывается по Escape;
4. focus остается или возвращается на тот же trigger согласно контракту.

## Методика

- Открытие overlay использовалось как подготовительный шаг.
- Закрытие выполнялось по Escape.
- Для Drawer учитывалась анимация закрытия `650 ms`; состояние проверялось после transition.
- Успех фиксировался только тогда, когда overlay закрыт, а `document.activeElement` снова является видимой кнопкой «Открыть».

Машиночитаемый отчет: `docs/q04-focus-return-report.json`.

Следующая проверка: `Q-04.8` — screen-reader semantics минимум в одном доступном сочетании reader/browser.
