#!/bin/bash

folders=(
  "packages/tend-ui/dist"
  "packages/tend-ui-api/dist"
  "packages/tend-ui-factories/dist"
  "packages/tend-ui-fonts/dist"
  "packages/tend-ui-grid/dist"
  "packages/tend-ui-header/dist"
  "packages/tend-ui-hooks/dist"
  "packages/tend-ui-icons/dist"
  "packages/tend-ui-locale/dist"
  "packages/tend-ui-logos/dist"
  "packages/tend-ui-primitives/dist"
  "packages/tend-ui-styling/dist"
  "packages/tend-ui-theme/dist"
  "packages/tend-ui-tokens/dist"
  "packages/tend-ui-types/dist"
  "packages/tend-ui-typography/dist"
  "packages/tend-ui-utils/dist"
)

for folder in "${folders[@]}";
do
  if [ -d "$folder" ];
    then
      echo "Переходим в $folder"
      cd "$folder" || exit
      echo "Создаем ссылку на $folder"
      yarn link
      cd - || exit
    else
      echo "Директория $folder не найдена"
  fi
done
