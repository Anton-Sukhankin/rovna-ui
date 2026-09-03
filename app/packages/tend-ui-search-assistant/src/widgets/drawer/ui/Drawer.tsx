import { Drawer } from '@rovna-ui/primitives';
import { Title } from '@rovna-ui/components/typography';
import React, { useCallback } from 'react';

import { useStore } from '@search-assistant/app/store/hooks';
import { DRAWER_HEADER_CLASSNAME } from '@search-assistant/shared/constants/classnames';
import { Chat } from '@search-assistant/widgets/chat';

import * as Styled from './Drawer.styled';

export const DrawerComponent = () => {
  const { open, dispatch } = useStore('open');

  const toggleOpen = useCallback(() => {
    dispatch('general/open');
  }, [dispatch]);

  return (
    <Drawer.Root open={open} onClose={toggleOpen}>
      <Styled.Header className={DRAWER_HEADER_CLASSNAME}>
        <Title level='h5' margin={'0 auto 0 0'}>
          Поиск
        </Title>
        <Drawer.CloseButton />
      </Styled.Header>
      <Chat />
    </Drawer.Root>
  );
};
