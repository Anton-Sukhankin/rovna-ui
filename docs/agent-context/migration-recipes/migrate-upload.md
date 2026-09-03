# Migration Recipe: Upload

## Evidence

- [UploadArea passport](../component-passports/generated/rovna-ui-upload-uploadarea.md)
- [UploadButton passport](../component-passports/generated/rovna-ui-upload-uploadbutton.md)

## Sequence

1. Зафиксируйте accepted types, size/count limits, duplicate policy, progress, cancel, retry и remove behavior.
2. Начните с local `File` fixtures, не подключая реальный endpoint.
3. Выберите UploadArea для drag/drop или UploadButton для явного file picker action.
4. Проверьте click/keyboard activation, drag enter/leave/drop и rejected file states.
5. Подключите local adapter для progress/success/error/timeout/cancel.
6. Проверьте доступное имя, текст ограничений, live status и управление списком файлов.
7. Реальный transport подключайте только через явно разрешенный consumer adapter.

## Stop Conditions

- upload URL относится к закрытому корпоративному сервису;
- file validation не определена;
- cancel/retry не имеют конечного состояния;
- sensitive filename/content попадает в логи или snapshots.

## Acceptance

- valid, invalid, limit, progress, success, error, cancel и retry states доказаны;
- drag/drop и keyboard работают;
- неожиданных network requests нет;
- файлы не сохраняются в repository artifacts.
