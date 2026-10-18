import { ClockLine as ClockHand } from '#src/ClockLine';
import { clockHourId, clockMinuteId, clockSecondId } from '#src/common';
import { time } from '#src/time';
import { getTestId } from '#src/utilities';

export const ClockHands = () => (
  <>
    <ClockHand
      class="stroke-zinc-200 stroke-3 dark:stroke-zinc-600"
      data-testid={getTestId('clock-subsecond')}
      length={82}
      transform={time.subsecond}
    />
    <ClockHand
      class="stroke-zinc-600 stroke-4 dark:stroke-zinc-200"
      data-testid={getTestId(clockHourId)}
      length={46}
      transform={time.hour}
    />
    <ClockHand
      class="stroke-zinc-400 stroke-3"
      data-testid={getTestId(clockMinuteId)}
      length={64}
      transform={time.minute}
    />
    <ClockHand
      class="stroke-preact stroke-2"
      data-testid={getTestId(clockSecondId)}
      length={76}
      transform={time.second}
    />
  </>
);
