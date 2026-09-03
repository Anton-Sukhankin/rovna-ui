import React from 'react';
import ReactDOM from 'react-dom';
import { RovnaUI } from '@rovna-ui/components/theme';
import { Button } from '@rovna-ui/components/primitives/Button';
import { SMaterials } from '@rovna-ui/logos/SMaterials';

RovnaUI.init();

const app = React.createElement(
  RovnaUI,
  { lang: 'ru', theme: 'samolet' },
  React.createElement(
    'main',
    { 'data-testid': 'r06-webpack-consumer' },
    React.createElement(SMaterials, {
      'aria-label': '\u041b\u043e\u0433\u043e\u0442\u0438\u043f \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u043e\u0432',
      size: 20,
    }),
    React.createElement(
      Button,
      { size: 'medium', variant: 'primary' },
      'Webpack-\u043a\u043d\u043e\u043f\u043a\u0430 Rovna UI',
    ),
  ),
);

ReactDOM.render(app, document.getElementById('root'));
