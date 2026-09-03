import React from 'react';
import ReactDOM from 'react-dom';
import { RovnaUI } from '@rovna-ui/components/theme';
import { Button } from '@rovna-ui/components/primitives/Button';

RovnaUI.init();

function App() {
  return (
    <RovnaUI lang="ru" theme="samolet">
      <main data-testid="consumer-smoke">
        <Button variant="primary" size="medium">
          F-07 Smoke Button
        </Button>
      </main>
    </RovnaUI>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

window.__ROVNA_UI_CONSUMER_SMOKE__ = {
  rendered: true,
  text: 'F-07 Smoke Button',
};

