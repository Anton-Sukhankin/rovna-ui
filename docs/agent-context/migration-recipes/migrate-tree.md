# Migration Recipe: Tree

## Evidence

- [Tree passport](../component-passports/generated/rovna-ui-tree-tree.md)

## Boundary

`@rovna-ui/tree` имеет Storybook evidence, но остается `source-only` вне поддерживаемой 21-package release boundary. До product integration нужен отдельный artifact/consumer proof.

## Sequence

1. Зафиксируйте node identity, parent/child model, expanded, selected, pinned и loading states.
2. Отделите read-only navigation от drag/sort mechanics.
3. Подготовьте deterministic fixture для deep tree, empty, loading, error и long labels.
4. Проверьте keyboard navigation, expand/collapse, selected state и accessible tree semantics.
5. Для drag/sort отдельно подтвердите `@dnd-kit/*` behavior, drop rules и rollback.
6. Выполните large-data/virtualization check до подключения реальных данных.
7. Соберите source-only пакет и подтвердите tarball consumer перед миграцией продукта.

## Stop Conditions

- node IDs нестабильны;
- circular/deep data не нормализованы;
- drag operation меняет данные без rollback;
- package artifact не подтвержден.

## Acceptance

- expand/select/pin и применимый drag contract доказаны;
- keyboard и screen-reader semantics проверены;
- large tree не блокирует интерфейс;
- service requests заменены local fixtures.
