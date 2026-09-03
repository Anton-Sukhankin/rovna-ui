import React from 'react';
import { Close } from '@rovna-ui/icons/Close';
import { Done } from '@rovna-ui/icons/Done';
import { Text } from '@rovna-ui/typography';

import { useTheme } from '@rovna-internal/components/theme/Theme';
import { useAllowClear } from '@rovna-internal/components/hooks/useAllowClear';
import { useSize } from '@rovna-internal/components/hooks/useSize';
import { Spinner } from '@rovna-internal/components/primitives/Spinner';
import { Box } from '@rovna-internal/components/grid/Box';
import { Checkbox } from '@rovna-internal/components/primitives/Checkbox';

import { ArrowIcon, Root } from './styled';
import {
  BaseOptionType,
  DefaultOptionType,
  SelectComponent,
  SelectProps,
  SelectRef,
} from './types';

let selectAriaObserver: MutationObserver | undefined;
let selectAriaObserverUsers = 0;
const pendingSelectAriaChecks = new WeakMap<HTMLElement, number>();

const clearPendingSelectAriaCheck = (combobox: HTMLElement) => {
  const timeoutId = pendingSelectAriaChecks.get(combobox);
  if (timeoutId !== undefined) window.clearTimeout(timeoutId);
  pendingSelectAriaChecks.delete(combobox);
};

const removePopupReferences = (combobox: HTMLElement) => {
  combobox.removeAttribute('aria-activedescendant');
  combobox.removeAttribute('aria-controls');
  combobox.removeAttribute('aria-owns');
};

const syncSelectAria = () => {
  document
    .querySelectorAll<HTMLElement>('.rovna-ui-select-item-option[aria-selected]')
    .forEach(option => {
      if (!option.closest('[role="listbox"]')) option.removeAttribute('aria-selected');
    });
  document.querySelectorAll<HTMLElement>('[role="listbox"]').forEach(listbox => {
    if (!listbox.hasAttribute('aria-label')) {
      listbox.setAttribute('aria-label', 'Варианты выбора');
    }
  });

  document
    .querySelectorAll<HTMLElement>(
      '[data-testid="rovna-ui-select"], [data-testid="rovna-ui-timeselect"]',
    )
    .forEach(root => {
      root.removeAttribute('aria-label');
      const combobox = root.querySelector<HTMLElement>('[role="combobox"]');
      if (!combobox) return;

      const expectedOpen = root.getAttribute('data-rovna-ui-open') === 'true';
      if (!expectedOpen) {
        clearPendingSelectAriaCheck(combobox);
        if (combobox.getAttribute('aria-expanded') !== 'false') {
          combobox.setAttribute('aria-expanded', 'false');
        }
        removePopupReferences(combobox);

        return;
      }

      const activeDescendant = combobox.getAttribute('aria-activedescendant');
      if (activeDescendant && !document.getElementById(activeDescendant)) {
        combobox.removeAttribute('aria-activedescendant');
      }

      const controls = combobox.getAttribute('aria-controls');
      if (!controls || !document.getElementById(controls)) {
        const listbox = combobox.id
          ? document.getElementById(`${combobox.id}_list`)
          : null;
        if (listbox && controls !== listbox.id) {
          clearPendingSelectAriaCheck(combobox);
          combobox.setAttribute('aria-controls', listbox.id);
        } else if (!pendingSelectAriaChecks.has(combobox)) {
          const timeoutId = window.setTimeout(() => {
            pendingSelectAriaChecks.delete(combobox);
            const expectedListbox = combobox.id
              ? document.getElementById(`${combobox.id}_list`)
              : null;
            if (combobox.getAttribute('aria-expanded') === 'true' && !expectedListbox) {
              combobox.setAttribute('aria-expanded', 'false');
              removePopupReferences(combobox);
            }
          }, 100);
          pendingSelectAriaChecks.set(combobox, timeoutId);
        }
      } else {
        clearPendingSelectAriaCheck(combobox);
      }

    });
};

const subscribeToSelectAria = () => {
  selectAriaObserverUsers += 1;
  if (!selectAriaObserver) {
    selectAriaObserver = new MutationObserver(syncSelectAria);
    selectAriaObserver.observe(document.body, {
      attributeFilter: [
        'aria-activedescendant',
        'aria-controls',
        'aria-expanded',
        'aria-label',
        'aria-owns',
        'aria-selected',
        'data-rovna-ui-open',
      ],
      attributes: true,
      childList: true,
      subtree: true,
    });
  }
  syncSelectAria();

  return () => {
    selectAriaObserverUsers -= 1;
    if (selectAriaObserverUsers === 0) {
      selectAriaObserver?.disconnect();
      selectAriaObserver = undefined;
    }
  };
};

const BaseSelect = <
  ValueType,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>(
  {
    fullWidth,
    width,
    maxTagCount = 2,
    allowClear,
    clearIconTooltip,
    loading = false,
    disabled,
    notFoundContent,
    dropdownRender,
    onDropdownVisibleChange,
    open,
    customSuffixIcon,
    optionDescription,
    optionRender,
    onChange,
    ...props
  }: SelectProps<ValueType, OptionType>,
  ref: React.ForwardedRef<SelectRef>,
) => {
  const theme = useTheme();
  const allowClearProp = useAllowClear({ allowClear, clearIconTooltip });
  const size = useSize(props.size);
  const accessibleName =
    props['aria-label'] ??
    (typeof props.placeholder === 'string' ? props.placeholder : 'Выбор значения');

  React.useLayoutEffect(subscribeToSelectAria, [accessibleName]);

  const [innerOpen, setInnerOpen] = React.useState(false);
  const isMultiple = props.mode === 'multiple';
  const hasOptions = Boolean(
    props.options?.length || React.Children.count(props.children),
  );
  const canOpen = !loading || hasOptions;
  const requestedOpen = typeof open === 'boolean' ? open : innerOpen;
  const openProp = canOpen && requestedOpen;

  const handleDropdownVisibleChange = React.useCallback(
    (flag: boolean) => {
      setInnerOpen(flag);
      if (flag && !canOpen) return;
      onDropdownVisibleChange?.(flag);
    },
    [canOpen, onDropdownVisibleChange],
  );

  const handleChange = React.useCallback<
    NonNullable<SelectProps<ValueType, OptionType>['onChange']>
  >(
    (value, option) => {
      if (!isMultiple && open === undefined) setInnerOpen(false);
      onChange?.(value, option);
    },
    [isMultiple, onChange, open],
  );

  const maxTagPlaceholder = React.useCallback((values: unknown[]) => {
    return `+${values.length}`;
  }, []);

  const handleArrowClick = React.useCallback(() => {
    if (disabled || !canOpen) return;
    setInnerOpen(prevOpen => !prevOpen);
    onDropdownVisibleChange?.(!openProp);
  }, [canOpen, disabled, onDropdownVisibleChange, openProp]);

  const suffixIcon = React.useMemo(() => {
    if (loading) return <Spinner size='xs' />;
    if (customSuffixIcon !== undefined) return customSuffixIcon;

    return (
      <ArrowIcon
        size={16}
        $disabled={disabled}
        $open={openProp}
        onClick={handleArrowClick}
      />
    );
  }, [loading, customSuffixIcon, disabled, openProp, handleArrowClick]);

  const notFoundContentProp = React.useMemo(() => {
    if (loading) return <Box $height='200px' />;
    if (notFoundContent) return notFoundContent;
  }, [loading, notFoundContent]);

  const dropdownRenderProp = React.useCallback(
    (menu: React.ReactElement) => {
      const children = dropdownRender ? dropdownRender(menu) : menu;

      return (
        <Spinner loading={loading} color={theme.colors.blue600} size='small'>
          {children}
        </Spinner>
      );
    },
    [dropdownRender, loading, theme.colors.blue600],
  );

  const menuItemSelectedIcon = React.useMemo(() => {
    if (isMultiple)
      return (props: { isSelected: boolean }) => <Checkbox checked={props.isSelected} />;

    return <Done />;
  }, [isMultiple]);

  const _optionRender = React.useMemo<SelectProps<OptionType>['optionRender']>(() => {
    if (optionRender || !optionDescription) return optionRender;

    return option => {
      const description =
        typeof optionDescription === 'function'
          ? optionDescription({ label: option.label, value: option.value })
          : optionDescription;

      return (
        <Box $display='flex' $flexDirection='column'>
          {option.label}
          <Text size='small' color='gray650'>
            {description}
          </Text>
        </Box>
      );
    };
  }, [optionDescription, optionRender]);

  return (
    <Root<ValueType, OptionType>
      data-testid='rovna-ui-select'
      data-rovna-ui-open={openProp}
      maxTagPlaceholder={maxTagPlaceholder}
      open={openProp}
      menuItemSelectedIcon={menuItemSelectedIcon}
      {...props}
      aria-label={accessibleName}
      ref={ref}
      $theme={theme}
      $fullWidth={fullWidth}
      $width={width}
      $multi={isMultiple}
      loading={loading}
      disabled={disabled}
      allowClear={allowClearProp}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      maxTagCount={maxTagCount}
      suffixIcon={suffixIcon}
      removeIcon={<Close color={theme.colors.gray900} />}
      size={size}
      notFoundContent={notFoundContentProp}
      dropdownRender={dropdownRenderProp}
      optionRender={_optionRender}
      onChange={handleChange}
    />
  );
};

const Select = React.forwardRef(BaseSelect) as SelectComponent;

Select.displayName = 'Select';

export { Select };
