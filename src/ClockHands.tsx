import { type ReadonlySignal, useComputed } from '@preact/signals';

import { ClockLine as ClockHand } from '#src/ClockLine';
import {
  clockHourId,
  clockMinuteId,
  clockSecondId,
  hourRotation,
  minuteRotation,
  secondRotation,
  subsecondRotation,
} from '#src/common';
import { getTestId } from '#src/utilities';

interface ClockHandsProps {
  clock: ReadonlySignal<number>;
}

export const ClockHands = ({ clock }: ClockHandsProps) => {
  const hour = useComputed(() => hourRotation(clock.value));
  const minute = useComputed(() => minuteRotation(clock.value));
  const second = useComputed(() => secondRotation(clock.value));
  const subsecond = useComputed(() => subsecondRotation(clock.value));

  return (
    <>
      <ClockHand
        class="stroke-zinc-200 stroke-3 dark:stroke-zinc-600"
        data-testid={getTestId('clock-subsecond')}
        length={82}
        transform={subsecond.value}
      />
      <ClockHand
        class="stroke-zinc-600 stroke-4 dark:stroke-zinc-200"
        data-testid={getTestId(clockHourId)}
        length={46}
        transform={hour.value}
      />
      <ClockHand
        class="stroke-zinc-400 stroke-3"
        data-testId={getTestId(clockMinuteId)}
        length={64}
        transform={minute.value}
      />
      <ClockHand
        class="stroke-preact stroke-2"
        data-testid={getTestId(clockSecondId)}
        length={76}
        transform={second.value}
      />
    </>
  );
};
