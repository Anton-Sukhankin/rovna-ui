type UpdateFunction = (easedProgress: number) => void;

export const RAF = (
  updateFunction: UpdateFunction,
  startTime: number,
  duration: number,
  delay = 0,
) => {
  const currentTime = performance.now();
  const timeElapsed = currentTime - startTime;

  if (timeElapsed < delay) {
    if (timeElapsed === 0) updateFunction(0);
    requestAnimationFrame(() => RAF(updateFunction, startTime, duration, delay));

    return;
  }

  const adjustedTimeElapsed = timeElapsed - delay;
  const progress = Math.min(adjustedTimeElapsed / duration, 1);
  const easedProgress = easeInOutQuad(progress);

  updateFunction(easedProgress);

  if (progress < 1) {
    requestAnimationFrame(() => RAF(updateFunction, startTime, duration, delay));
  }
};

const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
