export const clamp = (number: number, min: number, max: number) => {
  number = +number;
  min = +min;
  max = +max;
  min = min === min ? min : 0;
  max = max === max ? max : 0;
  if (number === number) {
    number = number <= max ? number : max;
    number = number >= min ? number : min;
  }

  return number;
};
