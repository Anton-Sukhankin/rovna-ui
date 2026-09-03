export default function debounce(func, wait = 0) {
  let timeoutId;

  function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  }

  debounced.cancel = () => {
    clearTimeout(timeoutId);
  };

  debounced.flush = () => {};

  return debounced;
}

