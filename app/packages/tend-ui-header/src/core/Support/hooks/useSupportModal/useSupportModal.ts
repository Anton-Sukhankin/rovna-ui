import React from 'react';

// Глобальное состояние для одной модалки на странице
let isSupportModalOpen = false;
let updateCallbacks: (() => void)[] = [];

/**
 * Хук для глобального управления модалкой поддержки
 * Предполагается, что модалка одна на странице
 *
 * @example
 * ```tsx
 * const { openSupport, closeSupport, isOpen, toggleSupport } = useSupportModal();
 *
 * return (
 *   <Button onClick={openSupport}>
 *     Открыть поддержку
 *   </Button>
 * );
 * ```
 */
export const useSupportModal = () => {
  const [isOpen, setIsOpen] = React.useState(isSupportModalOpen);

  React.useEffect(() => {
    const callback = () => setIsOpen(isSupportModalOpen);
    updateCallbacks.push(callback);

    return () => {
      updateCallbacks = updateCallbacks.filter(cb => cb !== callback);
    };
  }, []);

  const openSupport = React.useCallback(() => {
    isSupportModalOpen = true;
    updateCallbacks.forEach(cb => cb());
  }, []);

  const closeSupport = React.useCallback(() => {
    isSupportModalOpen = false;
    updateCallbacks.forEach(cb => cb());
  }, []);

  const toggleSupport = React.useCallback(() => {
    if (isSupportModalOpen) {
      closeSupport();
    } else {
      openSupport();
    }
  }, [openSupport, closeSupport]);

  return {
    isOpen,
    openSupport,
    closeSupport,
    toggleSupport,
  };
};
