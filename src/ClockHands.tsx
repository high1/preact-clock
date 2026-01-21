import { effect } from '@preact/signals';

import { ClockLine as ClockHand } from '@/ClockLine';
import { time } from '@/time';

effect(() => {
  let frame = requestAnimationFrame(function loop() {
    time.update();
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
      transform={time.milisecond}
    />
    <ClockHand
      class="stroke-zinc-600 stroke-4 dark:stroke-zinc-200"
      length={46}
      transform={time.hour}
    />{' '}
    le
    <ClockHand
      class="stroke-zinc-400 stroke-3"
      length={64}
      transform={time.minute}
    />
    <ClockHand
      class="stroke-preact stroke-2"
      length={76}
      transform={time.second}
    />
  </>
);
