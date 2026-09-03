import React from 'react';

type DatePickerVisibilityContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DatePickerVisibilityContext = React.createContext<
  DatePickerVisibilityContextType | undefined
>(undefined);
export const useDatePickerVisibilityContext = () =>
  React.useContext(DatePickerVisibilityContext);
