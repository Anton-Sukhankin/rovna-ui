import React from 'react';
import ReactDOM from 'react-dom';
import { RovnaUI } from '@rovna-ui/components/theme';
import { Button } from '@rovna-ui/components/primitives/Button';
import { SMaterials } from '@rovna-ui/logos/SMaterials';

RovnaUI.init();

function App() {
  return (
    <RovnaUI lang="ru" theme="samolet">
      <main data-testid="consumer-clean-package-smoke">
        <SMaterials aria-label="F-11 packaged logo" size={20} />
        <Button variant="primary" size="medium">
          F-09 Clean Package Button
        </Button>
      </main>
    </RovnaUI>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

window.__ROVNA_UI_F09_CLEAN_PACKAGE_SMOKE__ = {
  rendered: true,
  text: 'F-09 Clean Package Button',
  packagedLogo: true,
};
