import React from 'react';

import { Box } from '@rovna-internal/components/grid/Box';

import { PopoverProps, PopoverRef } from './types';
import { Root } from './styled';

const Popover = React.forwardRef<PopoverRef, PopoverProps>(
  (
    {
      content,
      footer,
      arrow = false,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
    const lastActiveElementRef = React.useRef<HTMLElement | null>(null);
    const wasOpenRef = React.useRef(false);
    const open = controlledOpen ?? uncontrolledOpen;

    const handleOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        if (nextOpen) {
          lastActiveElementRef.current =
            document.activeElement instanceof HTMLElement
              ? document.activeElement
              : null;
        }
        if (controlledOpen === undefined) setUncontrolledOpen(nextOpen);
        onOpenChange?.(nextOpen);
      },
      [controlledOpen, onOpenChange],
    );

    React.useEffect(() => {
      if (!open) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== 'Escape') return;
        handleOpenChange(false);
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleOpenChange, open]);

    React.useEffect(() => {
      if (wasOpenRef.current && !open) {
        lastActiveElementRef.current?.focus({ preventScroll: true });
      }
      wasOpenRef.current = open;
    }, [open]);

    const contentProp = React.useMemo(() => {
      if (footer)
        return (
          <>
            {content}
            <Box $display='flex' $justifyContent='flex-end' $gap={8} $mt={20}>
              {footer.map(node => node)}
            </Box>
          </>
        );

      return content;
    }, [content, footer]);

    return (
      <Root
        data-testid='rovna-ui-popover'
        {...props}
        ref={ref}
        arrow={arrow}
        open={open}
        onOpenChange={handleOpenChange}
        content={contentProp}
      />
    );
  },
);

Popover.displayName = 'Popover';

export { Popover };
