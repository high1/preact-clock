import { useComputed, useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';

import { ClockLine as ClockHand } from '#src/ClockLine';
import { clockHourId, clockMinuteId, clockSecondId } from '#src/common';
import {
  getSecondsSinceMidnight,
  hourTransform,
  minuteTransform,
  secondTransform,
  subsecondTransform,
} from '#src/time';
import { getTestId } from '#src/utilities';

export const ClockHands = () => {
  const clock = useSignal(getSecondsSinceMidnight());
  const subsecond = useComputed(() => subsecondTransform(clock.value));
  const hour = useComputed(() => hourTransform(clock.value));
  const minute = useComputed(() => minuteTransform(clock.value));
  const second = useComputed(() => secondTransform(clock.value));

  useEffect(() => {
    let frame = requestAnimationFrame(function loop() {
      clock.value = getSecondsSinceMidnight();
      frame = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [clock]);

  return (
    <>
      <ClockHand
        class="stroke-zinc-200 stroke-3 dark:stroke-zinc-600"
        data-testid={getTestId('clock-subsecond')}
        length={82}
        transform={subsecond}
      />
      <ClockHand
        class="stroke-zinc-600 stroke-4 dark:stroke-zinc-200"
        data-testid={getTestId(clockHourId)}
        length={46}
        transform={hour}
      />
      <ClockHand
        class="stroke-zinc-400 stroke-3"
        data-testid={getTestId(clockMinuteId)}
        length={64}
        transform={minute}
      />
      <ClockHand
        class="stroke-preact stroke-2"
        data-testid={getTestId(clockSecondId)}
        length={76}
        transform={second}
      />
    </>
  );
};
