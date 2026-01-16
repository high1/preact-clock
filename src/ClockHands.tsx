import { useComputed, useSignal, useSignalEffect } from '@preact/signals';

import { ClockLine as ClockHand } from '@/ClockLine';
import { hours, rotate, seconds } from '@/common';

const getSecondsSinceMidnight = (): number =>
  (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;

export const ClockHands = () => {
  const time = useSignal(getSecondsSinceMidnight());

  const subsecond = useComputed(() => rotate(time.value % 1, 0));
  const second = useComputed(() => rotate((time.value % seconds) / seconds));
  const minute = useComputed(() =>
    rotate(((time.value / seconds) % seconds) / seconds),
  );
  const hour = useComputed(() =>
    rotate(((time.value / seconds ** 2) % hours) / hours),
  );

  useSignalEffect(() => {
    let frame = requestAnimationFrame(function loop() {
      time.value = getSecondsSinceMidnight();
      frame = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(frame);
    };
  });

  return (
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
      />
      <ClockHand
        class="stroke-zinc-400 stroke-3"
        length={64}
        transform={minute}
      />
      <ClockHand
        class="stroke-preact stroke-2"
        length={76}
        transform={second}
      />
    </>
  );
};
