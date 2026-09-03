## Раздел `Docs` в storybook не открывается. Что делать?

```sh
yarn clean:modules && rm -rf node_modules && yarn install && yarn yarn-deduplicate && yarn install
```

После этого закоммитить изменения под `build` (чтобы в `changelog` ничего не попало лишнего) скоупом и пушнуть в `main`

## При попытке выпустить релиз падает ошибка. Что делать?

```
yarn clean:modules && rm -rf node_modules && yarn cache clean && npm cache clean --force && yarn install
```

После этого попробовать зарелизить еще раз

## При оборачивании компонента в `styled-components` падает ошибка `The inferred type of ... cannot be named without a reference to`. Что делать?

Это ошибка `typescript` и с этим ничего не сделать. Обычно помогает кастинг типов через `as`

```tsx
import { Text } from '@rovna-ui/typography';

export const Time = styled(Text)`
  // тут ваш код
` as typeof Text;
```

Референс:
https://github.com/microsoft/TypeScript/issues/36800
https://github.com/Microsoft/TypeScript/issues/30858
