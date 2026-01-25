import { computed, signal } from '@preact/signals';

import { rotate, seconds } from '@/common';

const hours = seconds / 5;
const getSecondsSinceMidnight = () =>
  (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;

const clock = signal(getSecondsSinceMidnight());

export const time = {
  hour: computed(() => rotate(((clock.value / seconds ** 2) % hours) / hours)),
  minute: computed(() => rotate(((clock.value / seconds) % seconds) / seconds)),
  second: computed(() => rotate((clock.value % seconds) / seconds)),
  subsecond: computed(() => rotate(clock.value % 1, 0)),
  update: () => (clock.value = getSecondsSinceMidnight()),
};
