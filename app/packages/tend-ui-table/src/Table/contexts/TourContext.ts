import React from 'react';

/**
 * @private Not for public usage
 */
type TourContextType = {
  ui: {
    toolbar: React.RefObject<HTMLDivElement>;
    cell: React.RefObject<HTMLTableCellElement>;
    settingsButton: React.RefObject<HTMLButtonElement>;
    filtersButton: React.RefObject<HTMLButtonElement>;
    sortersButton: React.RefObject<HTMLButtonElement>;
  };
};
/**
 * @private Not for public usage
 */
const TourContext = React.createContext<TourContextType | undefined>(undefined);
/**
 * @private Not for public usage
 */
const useTourContext = () => React.useContext(TourContext);

export { TourContext, useTourContext };
export type { TourContextType };
