const UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB'];

const exponent = (number: number) => {
  return Math.min(Math.floor(Math.log10(number) / 3), UNITS.length - 1);
};
const round = (number: number, exponent: number) => {
  const size = number / Math.pow(1000, exponent);

  return size.toFixed(size >= 10 ? 0 : 1);
};
const unit = (exponent: number) => {
  return UNITS[exponent];
};

/**
 * @description Форматирует байты в человеко-читаемый формат
 */
export const formatBytes = (number: number) => {
  const _exponent = exponent(number);
  const size = round(number, _exponent);
  const _unit = unit(_exponent);

  return [size, _unit].join(' ');
};
