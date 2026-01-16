import { computed, effect, signal } from '@preact/signals';

import { ClockLine as ClockHand } from '@/ClockLine';
import { hours, rotate, seconds } from '@/common';

const getSecondsSinceMidnight = (): number =>
  (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;

const time = signal(getSecondsSinceMidnight());
const subsecond = computed(() => rotate(time.value % 1, 0));
const second = computed(() => rotate((time.value % seconds) / seconds));
const minute = computed(() =>
  rotate(((time.value / seconds) % seconds) / seconds),
);
const hour = computed(() =>
  rotate(((time.value / seconds ** 2) % hours) / hours),
);

effect(() => {
  let frame = requestAnimationFrame(function loop() {
    time.value = getSecondsSinceMidnight();
    frame = requestAnimationFrame(loop);
  });
  return () => {
    cancelAnimationFrame(frame);
  };
});

export const ClockHands = () => (
  <>
    <ClockHand
      class="stroke-zinc-200 stroke-3 dark:stroke-zinc-600"
      length={82}
      transform={subsecond}
    />
    <ClockHand
      class="stroke-zinc-600 stroke-4 dark:stroke-zinc-200"
      length={46}
      transform={hour}
    />{' '}
    le
    <ClockHand
      class="stroke-zinc-400 stroke-3"
      length={64}
      transform={minute}
    />
    <ClockHand class="stroke-preact stroke-2" length={76} transform={second} />
  </>
);
