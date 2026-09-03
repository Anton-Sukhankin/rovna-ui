# @rovna-ui/notifications

# Установка

```sh
yarn add @rovna-ui/notifications@latest
```


# Использование

### Props

```javascript
type
NotificationAppProps = {
    onPublication? : (ctx: ServerPublicationContext) => void;
    onConnected? : (ctx: ConnectedContext) => void;
    onError? : (ctx: ErrorContext) => void;
};
```

#### На проекте импортируем и используем компонент по месту:

```JSX
import { Notifications } from "@rovna-ui/notifications";

export const App = () => (
  <Layout>
    <Notifications
      onPublication={ctx => {
        console.log('onPublication', ctx);
      }}
      onConnected={ctx => {
        console.log('onConnected', ctx);
      }}
      onError={ctx => {
        console.log('onError', ctx);
      }}
    />
  </Layout>
);
```
