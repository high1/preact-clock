import { ClockLine as ClockHand } from '#src/ClockLine';
import { clockHourId, clockMinuteId, clockSecondId } from '#src/common';
import { useClockAnimation } from '#src/useClockAnimation';
import { getTestId } from '#src/utilities';

interface ClockHandsProps {
  zone: () => string;
}

export const ClockHands = (props: ClockHandsProps) => {
  const { hour, minute, second, subsecond } = useClockAnimation(props.zone);

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
        class="stroke-preact stroke-2 dark:stroke-white"
        data-testid={getTestId(clockSecondId)}
        length={76}
        transform={second}
      />
    </>
  );
};
