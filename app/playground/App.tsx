import React from 'react';
import axios from 'axios';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';

import { RovnaUI } from '@rovna-internal/components/theme';
import { Toast } from '@rovna-internal/components/primitives/Toast';
import { SamoletHeader as Header } from '@rovna-ui/header';
// import { Header } from '@rovna-ui/header';
import { Layout } from '@rovna-ui/primitives';
import { Normalize } from '@rovna-ui/styling';

import { MuseoSansCyrl } from '../packages/tend-ui-fonts/src/MuseoSansCyrl';
import { TablePage } from './TablePage';
import { TreePage } from './TreePage';
import { FormsPage } from './FormsPage';
import { UploadPage } from './UploadPage';
import { FiltersPage } from './FiltersPage';
import { ToastPage } from './ToastPage';
import { FaviconsPage } from './FaviconsPage';
import { AlertPage } from './AlertPage';
// import { NotificationsApp } from './Notifications';
// import { SearchAssistantApp } from './SearchAssistant';

export const client = axios.create();

Toast.init();
RovnaUI.init();

export const App = () => {
  return (
    <BrowserRouter>
      <RovnaUI client={client}>
        <Normalize />
        <MuseoSansCyrl />
        <Layout.Root>
          <Header
            // slots={{
            // notifications: <NotificationsApp />,
            // search: <SearchAssistantApp />,
            // }}
            stand='stage'
            app='s.pro'
            user={{
              username: 'Kvokka',
              firstName: 'Квокка',
              lastName: 'Квокковна',
              email: 'user@example.com',
            }}
            navigation={{
              items: [
                {
                  key: '1',
                  label: <Link to='/table'>Table</Link>,
                },
                {
                  key: '2',
                  label: <Link to='/tree'>Tree</Link>,
                },
                {
                  key: '3',
                  label: <Link to='/forms'>Forms</Link>,
                },
                {
                  key: '4',
                  label: <Link to='/upload'>Upload</Link>,
                },
                {
                  key: '5',
                  label: <Link to='/filters'>Filters</Link>,
                },
                {
                  key: '6',
                  label: <Link to='/toast'>Toast</Link>,
                },
                {
                  key: '7',
                  label: <Link to='/favicons'>Favicons</Link>,
                },
                {
                  key: '8',
                  label: <Link to='/alert'>Alert</Link>,
                },
              ],
            }}
          />
          <Layout.Main>
            <Switch>
              <Route path='/table'>
                <TablePage />
              </Route>
              <Route path='/tree'>
                <TreePage />
              </Route>
              <Route path='/forms'>
                <FormsPage />
              </Route>
              <Route path='/upload'>
                <UploadPage />
              </Route>
              <Route path='/filters'>
                <FiltersPage />
              </Route>
              <Route path='/toast'>
                <ToastPage />
              </Route>
              <Route path='/favicons'>
                <FaviconsPage />
              </Route>
              <Route path='/alert'>
                <AlertPage />
              </Route>
              <Route path='/'>
                <Redirect to='/table' />
              </Route>
            </Switch>
          </Layout.Main>
        </Layout.Root>
      </RovnaUI>
    </BrowserRouter>
  );
};
