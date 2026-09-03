import React from 'react';
import { isUndefined } from '@rovna-ui/utils/isUndefined';
import { Apps } from '@rovna-ui/icons/Apps';

import { Dropdown } from '@rovna-internal/components/primitives/Dropdown';
import { Box } from '@rovna-internal/components/grid/Box';
import { Divider } from '@rovna-internal/components/ui/Divider';
import { Text } from '@rovna-internal/components/typography/Text';
import { useTheme } from '@rovna-internal/components/theme/Theme';
import { ToggleButton } from '@rovna-internal/components/primitives/ToggleButton';
import { useBoolean } from '@rovna-internal/components/hooks/useBoolean';
import { Tooltip } from '@rovna-internal/components/primitives/Tooltip';

import { Col } from './styled';
import { BurgerMenuItem, BurgerMenuProps } from './types';

const Item: React.FC<BurgerMenuItem> = ({ onClick, ...props }) => {
  const handleClick = React.useCallback(
    e => {
      if (props.disabled) {
        e.preventDefault();

        return;
      }
      onClick?.(e);
    },
    [props.disabled, onClick],
  );

  return (
    <Box
      {...props}
      $display='flex'
      $alignItems='center'
      $gap={8}
      $padding='10px 8px'
      $color='inherit'
      data-key={props.key}
      className={['rovna-ui-burger-menu-item', props.className].filter(Boolean).join(' ')}
      onClick={handleClick}
    >
      {props.before}
      <Text strong disabled={props.disabled}>
        {props.label}
      </Text>
      {props.after}
    </Box>
  );
};

const ROWS_AMOUNT = 5;

const BurgerMenu = ({
  title,
  extra,
  items,
  selectedKeys = [],
  footer,
}: BurgerMenuProps) => {
  const theme = useTheme();
  const hasTitle = !isUndefined(title);
  const hasExtra = !isUndefined(extra);
  const [opened, setOpened] = useBoolean();
  const shouldRenderHeader = hasTitle || hasExtra;

  const cols = React.useMemo(() => {
    const record = (items || []).reduce<Record<number, BurgerMenuItem[]>>(
      (accumulator, currentValue, index) => {
        const key = index % ROWS_AMOUNT;

        if (Array.isArray(accumulator[key])) {
          accumulator[key] = [...accumulator[key], currentValue];
        } else {
          accumulator[key] = [currentValue];
        }

        return accumulator;
      },
      {},
    );

    return Object.values(record);
  }, [items]);

  return (
    <Dropdown
      trigger={['click']}
      onOpenChange={setOpened}
      dropdownRender={React.useCallback(() => {
        return (
          <Dropdown.Content padding={24}>
            {shouldRenderHeader && (
              <>
                <Box $display='flex' $alignItems='center' $justifyContent='space-between'>
                  {title && (
                    <Text
                      strong
                      size='large'
                      className={['rovna-ui-burger-menu-title'].filter(Boolean).join(' ')}
                    >
                      {title}
                    </Text>
                  )}
                  {extra}
                </Box>
                <Divider />
              </>
            )}
            {items && (
              <Box
                as='ul'
                $margin='0'
                $padding='0'
                $display='flex'
                $flexDirection='column'
                $gap={8}
                className={['rovna-ui-burger-menu-list'].filter(Boolean).join(' ')}
              >
                {cols.map((rows, index) => (
                  <Box key={index} $display='flex' $gap={4}>
                    {rows.map(item => (
                      <Tooltip {...item.tooltip} key={item.key}>
                        <Col
                          theme={theme}
                          $selected={item.key ? selectedKeys.includes(item.key) : false}
                          $disabled={item.disabled}
                          className={['rovna-ui-burger-menu-item-wrapper']
                            .filter(Boolean)
                            .join(' ')}
                        >
                          <Item {...item} />
                        </Col>
                      </Tooltip>
                    ))}
                  </Box>
                ))}
              </Box>
            )}
            {footer && <Box $mt={24}>{footer}</Box>}
          </Dropdown.Content>
        );
      }, [cols, extra, footer, items, selectedKeys, shouldRenderHeader, theme, title])}
    >
      <ToggleButton
        aria-label={opened ? 'Закрыть меню приложений' : 'Открыть меню приложений'}
        aria-expanded={opened}
        selected={opened}
      >
        <Apps size={20} />
      </ToggleButton>
    </Dropdown>
  );
};

export { BurgerMenu };
