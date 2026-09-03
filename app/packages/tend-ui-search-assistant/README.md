# Search Assistant (Умный поиск)

## Установка

```sh
yarn add @rovna-ui/search-assistant@latest
```

## Использование

#### На проекте импортируем и используем компонент по месту:

```javascript
import { SearchAssistant } from "@rovna-ui/search-assistant";

export const App = () => (
  <Layout>
    <SearchAssistant />
  </Layout>
);
```

#### Использование через свою иконку или кастомный элемент для открытия чата:

```javascript
import { SearchAssistant } from "@rovna-ui/search-assistant";

export const App = () => (
  <Layout>
    <SearchAssistant 
      renderEntry={(handleOpen) => (
        <YourCustomButton onClick={handleOpen}>Открыть</YourCustomButton>
      )}
    />
  </Layout>
);
```

#### Использование на статичной странице, контейнере или webview (без функционала открытия):

```javascript
import { SearchAssistant } from "@rovna-ui/search-assistant";

export const App = () => (
  <Layout>
    <SearchAssistant chatOnly />
  </Layout>
);
```