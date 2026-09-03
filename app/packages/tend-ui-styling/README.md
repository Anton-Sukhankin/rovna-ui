# @rovna-ui/styling

Движок для стилизации `React` компонентов на основе `styled-components`

# Установка

```sh
yarn add @rovna-ui/styling@latest
```

# Использование

```jsx
import styled from 'styled-components';
import { Normalize } from '@rovna-ui/styling';
import { color, backgroundColor, width, height } from '@rovna-ui/styling/mixins';

const Box = styled.div`
  ${color};
  ${backgroundColor};
  ${width};
  ${height};
`;

const App = () => {
  return (
    <div>
      <Normalize />
      <Box $width={100} $height={100} $backgroundColor='red' $color='white'>
        Box
      </Box>
    </div>
  );
};
```
