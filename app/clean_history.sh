#!/bin/bash

# Скрипт для очистки истории Git, исключая проблемные файлы

set -e

# Проблемные файлы, которые нужно исключить
PROBLEMATIC_FILES=(
    "**/Up.svg"
    "**/fence.svg"
    "**/In.svg"
    "**/Out.svg"
    "**/Wooden"
    "**/Zoom"
)

echo "Начинаем очистку истории Git..."

# Получаем список коммитов для применения
COMMITS=$(git log --oneline main --not HEAD --reverse --format="%H")

for commit in $COMMITS; do
    echo "Применяем коммит: $(git log --oneline $commit -1)"
    
    # Применяем коммит без фиксации
    git cherry-pick $commit --no-commit || {
        echo "Конфликт в коммите $commit, пропускаем..."
        git cherry-pick --abort
        continue
    }
    
    # Удаляем проблемные файлы из индекса
    for pattern in "${PROBLEMATIC_FILES[@]}"; do
        git reset HEAD $pattern 2>/dev/null || true
        find . -name "$(basename $pattern)" -type f -delete 2>/dev/null || true
    done
    
    # Фиксируем коммит
    git commit --no-edit || {
        echo "Ошибка при фиксации коммита $commit"
        git cherry-pick --abort
        continue
    }
    
    echo "Коммит $commit успешно применен"
done

echo "Очистка истории завершена!" 