import { computed, signal } from '@preact/signals';

import { rotate, seconds } from '@/common';

const hours = seconds / 5;
const getSecondsSinceMidnight = (): number =>
  (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;

const clock = signal(getSecondsSinceMidnight());

export const time = {
  get hour() {
    return computed(() =>
      rotate(((clock.value / seconds ** 2) % hours) / hours),
    );
  },
  get milisecond() {
    return computed(() => rotate(clock.value % 1, 0));
  },
  get minute() {
    return computed(() =>
      rotate(((clock.value / seconds) % seconds) / seconds),
    );
  },
  get second() {
    return computed(() => rotate((clock.value % seconds) / seconds));
  },
  update: () => {
    clock.value = getSecondsSinceMidnight();
  },
};
