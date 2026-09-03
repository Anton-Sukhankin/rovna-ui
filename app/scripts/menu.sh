#!/bin/bash

BASE_DIR="packages"

clean_cache() {
  echo "Удаляем кеш..."
  if [ -d ".turbo" ]; then
    rm -rf ".turbo"
  fi

  for dir in "$BASE_DIR"/*; do
    if [ -d "$dir" ]; then
      TURBO_DIR="$dir/.turbo"
      if [ -d "$TURBO_DIR" ]; then
        echo "Удаляем кеш пакета $dir"
        rm -rf "$TURBO_DIR"
      fi
    fi
  done
  echo "Кеш успешно удален!"
}

clean_artifacts() {
  echo "Удаляем артефакт..."
  for dir in "$BASE_DIR"/*; do
    if [ -d "$dir" ]; then
      DIST_DIR="$dir/dist"
      if [ -d "$DIST_DIR" ]; then
        echo "Удаляем артефакты пакета $dir"
        rm -rf "$DIST_DIR"
      fi
    fi
  done
  echo "Артефакты успешно удалены!"
}

clean_modules() {
  echo "Удаляем модули..."
  if [ -d "node_modules" ]; then
    rm -rf "node_modules"
  fi

  for dir in "$BASE_DIR"/*; do
    if [ -d "$dir" ]; then
      MODULES_DIR="$dir/node_modules"
      if [ -d "$MODULES_DIR" ]; then
        echo "Удаляем модули пакета $dir"
        rm -rf "$MODULES_DIR"
      fi
    fi
  done
  echo "Модули успешно удалены!"
}

second() {
  PS3='Выберите пакет: '
  options=(
    "@rovna-ui/components"
    "@rovna-ui/api"
    "@rovna-ui/factories"
    "@rovna-ui/favicons"
    "@rovna-ui/fonts"
    "@rovna-ui/grid"
    "@rovna-ui/header"
    "@rovna-ui/hooks"
    "@rovna-ui/icons"
    "@rovna-ui/locale"
    "@rovna-ui/logos"
    "@rovna-ui/notifications"
    "@rovna-ui/primitives"
    "@rovna-ui/search-assistant"
    "@rovna-ui/styling"
    "@rovna-ui/theme"
    "@rovna-ui/tokens"
    "@rovna-ui/types"
    "@rovna-ui/typography"
    "@rovna-ui/utils"
    "Назад"
    "Выход 🚪"
  )
  select opt in "${options[@]}"
  do
      case $opt in
          "@rovna-ui/components")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release
              break
              ;;
          "@rovna-ui/api")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release:api
              break
              ;;
          "@rovna-ui/factories")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release:factories
              break
              ;;
          "@rovna-ui/favicons")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release:favicons
              break
              ;;
          "@rovna-ui/fonts")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release:fonts
              break
              ;;
          "@rovna-ui/grid")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release:grid
              break
              ;;
          "@rovna-ui/header")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release:header
              break
              ;;
          "@rovna-ui/hooks")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release:hooks
              break
              ;;
          "@rovna-ui/icons")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release:icons
              break
              ;;
          "@rovna-ui/locale")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release:locale
              break
              ;;
          "@rovna-ui/logos")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release:logos
              break
              ;;
          "@rovna-ui/notifications")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release:notifications
              break
              ;;
          "@rovna-ui/primitives")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release:primitives
              break
              ;;
          "@rovna-ui/search-assistant")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release:search-assistant
              break
              ;;
          "@rovna-ui/styling")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release:styling
              break
              ;;
          "@rovna-ui/theme")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release:theme
              break
              ;;
          "@rovna-ui/tokens")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release:tokens
              break
              ;;
          "@rovna-ui/types")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release:types
              break
              ;;
          "@rovna-ui/typography")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release:typography
              break
              ;;
          "@rovna-ui/utils")
              echo "Выпускаем новую версию $opt"
              yarn lint && yarn test && yarn build
              yarn release:utils
              break
              ;;
          "Назад")
              main
              break
              ;;
          "Выход 🚪")
              break
              ;;
          *)
              echo "Несуществующая команда $REPLY"
              ;;
      esac
  done
}

main() {
  PS3='Выберите команду: '
  options=(
    "Запустить storybook 📕"
    "Запустить песочницу"
    "Очистить кеш"
    "Очистить артефакты"
    "Очистить модули"
    "Запустить тесты"
    "Обновить тесты"
    "Сгенерировать артефакты"
    "Сгенерировать иконки"
    "Сгенерировать логотипы"
    "Вайп 🧹"
    "Выпустить версию"
    "Выгрузить статику в cdn"
    "Выход 🚪"
  )

  select opt in "${options[@]}"
  do
      case $opt in
          "Запустить storybook 📕")
              yarn storybook
              break
              ;;
          "Запустить песочницу")
              yarn dev
              break
              ;;
          "Очистить кеш")
              clean_cache
              break
              ;;
          "Очистить артефакты")
              clean_artifacts
              break
              ;;
          "Очистить модули")
              clean_modules
              break
              ;;
          "Запустить тесты")
              echo "Запускаем тесты..."
              yarn test
              break
              ;;
          "Обновить тесты")
              echo "Обновляем snapshots в тестах..."
              yarn test:update
              break
              ;;
          "Сгенерировать артефакты")
              yarn build
              break
              ;;
          "Сгенерировать иконки")
              yarn workspace @rovna-ui/icons generate:icons
              break
              ;;
          "Сгенерировать логотипы")
              yarn workspace @rovna-ui/logos generate:logos
              break
              ;;
          "Выгрузить статику в cdn")
              echo "Выгружаем статику в cdn..."
              yarn release:assets
              echo "Готово!"
              break
              ;;
          "Выпустить версию")
              second
              break
              ;;
          "Вайп 🧹")
              echo "Производим полный вайп..."
              clean_artifacts
              clean_cache
              yarn cache clean
              clean_modules
              echo "Готово!"
              break
              ;;
          "Выход 🚪")
              break
              ;;
          *)
              echo "Несуществующая команда $REPLY"
              ;;
      esac
  done
}

main