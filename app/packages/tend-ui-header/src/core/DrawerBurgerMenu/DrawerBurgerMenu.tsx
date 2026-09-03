import { Drawer, StackNavigation } from '@rovna-ui/primitives';
import { useTheme } from '@rovna-ui/theme';
import React from 'react';
import { ArrowBack, Menu } from '@rovna-ui/icons';
import { Box } from '@rovna-ui/grid';
import { Title } from '@rovna-ui/typography';
import { UNSTABLE_useControllableStateV2 as useControllableState } from '@rovna-ui/hooks';

import { BackButton, Button } from './styled';
import { DrawerBurgerMenuProps } from './types';

/**
 * Внутренний компонент для нужд дизайн системы
 */
const DrawerBurgerMenu = ({
  title,
  navigation,
  onClose,
  open,
  defaultOpen,
  header,
  footer,
  onOpenChange,
}: DrawerBurgerMenuProps) => {
  const theme = useTheme();
  const [__open, __setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: state => {
      onOpenChange?.(state);
      if (state === false) {
        onClose?.();
      }
    },
  });

  return (
    <>
      <Button
        type='button'
        aria-label={__open ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={__open}
        onClick={() => {
          __setOpen(p => !p);
        }}
        theme={theme}
        $selected={__open}
      >
        <Menu size={24} color='gray0' />
      </Button>
      <Drawer.Root
        aria-label={typeof title === 'string' ? title : 'Меню'}
        open={__open}
        fullscreen={{ offset: '0px' }}
        placement='right'
        backgroundColor='gray50'
        onClose={() => {
          __setOpen(false);
        }}
      >
        <Drawer.Header>
          <Box $display='flex' $alignItems='center' $gap={8}>
            <BackButton
              type='button'
              aria-label='Закрыть меню'
              onClick={() => {
                __setOpen(false);
              }}
            >
              <ArrowBack size={24} color='gray900' />
            </BackButton>
            <Title margin='0' level='h6'>
              {title}
            </Title>
          </Box>
        </Drawer.Header>
        <Drawer.Body>
          <Box $display='flex' $flexDirection='column' $gap={16}>
            {header}
            {navigation && <StackNavigation {...navigation} />}
            {footer}
          </Box>
        </Drawer.Body>
      </Drawer.Root>
    </>
  );
};

DrawerBurgerMenu.displayName = 'DrawerBurgerMenu';

export { DrawerBurgerMenu };
