import React from 'react';
import { Dayjs } from 'dayjs';

import { DatePickerProps } from '../types';

type DatePickerContextType = DatePickerProps & {
  _open?: boolean;
  _value?: Dayjs | null;
  setValue?: React.Dispatch<React.SetStateAction<Dayjs | null>>;
};

export const DatePickerContext = React.createContext<DatePickerContextType | undefined>(
  undefined,
);
export const useDatePickerContext = () => React.useContext(DatePickerContext);
