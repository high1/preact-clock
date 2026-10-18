import { computed, createModel, signal } from '@preact/signals';

import { rotate, seconds } from '#src/common';

const hours = seconds / 5;
// Wall-clock seconds since local midnight. Uses getters only (no setHours),
// so it never mutates the argument and is immune to DST transition days
// (which have 23 or 25 elapsed hours).
export const getSecondsSinceMidnight = (date: Date) =>
  date.getHours() * 3600 +
  date.getMinutes() * 60 +
  date.getSeconds() +
  date.getMilliseconds() / 1000;

const TimeModel = createModel(() => {
  const clock = signal(getSecondsSinceMidnight(new Date()));
  const update = () => (clock.value = getSecondsSinceMidnight(new Date()));

  requestAnimationFrame(function loop() {
    update();
    requestAnimationFrame(loop);
  });

  return {
    hour: computed(() =>
      rotate(((clock.value / seconds ** 2) % hours) / hours),
    ),
    minute: computed(() =>
      rotate(((clock.value / seconds) % seconds) / seconds),
    ),
    second: computed(() => rotate((clock.value % seconds) / seconds)),
    subsecond: computed(() => rotate(clock.value % 1, 0)),
  };
});

export const time = new TimeModel();
