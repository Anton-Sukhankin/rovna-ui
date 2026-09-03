import React from 'react';
import ReactDOM from 'react-dom';
import { RovnaUI } from '@rovna-ui/components/theme';
import { Button } from '@rovna-ui/components/primitives/Button';
import { Breadcrumbs } from '@rovna-ui/components/primitives/Breadcrumbs';

RovnaUI.init();

function App() {
  return (
    <RovnaUI lang="ru" theme="samolet">
      <main data-testid="f13-tarball-consumer">
        <Breadcrumbs
          items={[
            { key: 'home', label: 'Главная', href: '/' },
            { key: 'projects', label: 'Проекты', href: '/projects' },
            { key: 'current', label: 'Карточка проекта' },
          ]}
        />
        <Button variant="primary" size="medium">
          F-14 Tarball Button
        </Button>
      </main>
    </RovnaUI>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
