import { computed, createModel, effect, signal } from '@preact/signals';

import { rotate, seconds } from '@/common';

const hours = seconds / 5;
const getSecondsSinceMidnight = () =>
  (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;

const TimeModel = createModel(() => {
  const clock = signal(getSecondsSinceMidnight());
  const update = () => (clock.value = getSecondsSinceMidnight());

  effect(() => {
    requestAnimationFrame(function loop() {
      update();
      requestAnimationFrame(loop);
    });
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
