import { useComputed, useSignal } from '@preact/signals';

import { ClockHands } from '#src/ClockHands';
import { clockFaceId, clockLiveRegionId } from '#src/common';
import { Graduations } from '#src/Graduations';
import { ThemeToggle } from '#src/ThemeToggle';
import {
  formatTime,
  getSecondsSinceMidnightIn,
  getTimeZone,
  getTimeZones,
  now,
} from '#src/time';
import { TimezonePicker } from '#src/TimezonePicker';
import { useClock } from '#src/useClock';
import { getTestId } from '#src/utilities';

export const ClockFace = () => {
  useClock();

  const currentZone = useSignal(getTimeZone());
  const zones = getTimeZones();

  // Passing the signal to the live region updates only its text node.
  const clock = useComputed(() =>
    getSecondsSinceMidnightIn(now.value, currentZone.value),
  );
  const time = useComputed(() => formatTime(clock.value));

  return (
    <div
      class="grid grid-rows-[auto_1fr] justify-center gap-2 px-2 pbs-2 pbe-2 block-dvh dark:bg-zinc-800"
      data-testid={getTestId(clockFaceId)}
    >
      <div class="flex items-center justify-between gap-2">
        <TimezonePicker
          class="grow max-inline-100 min-inline-0"
          id="clock-timezone"
          onchange={(zone) => {
            currentZone.value = zone;
          }}
          value={currentZone.value}
          zones={zones}
        />
        <ThemeToggle />
      </div>
      <svg
        aria-labelledby="clock-title"
        class="block-full inline-full"
        role="img"
        viewBox="0 0 200 200"
      >
        <title id="clock-title">Clock</title>
        <image
          class="translate-5/12 block-1/6 inline-1/6 dark:hidden"
          href="logo-light.svg"
        />
        <image
          class="hidden translate-5/12 block-1/6 inline-1/6 dark:inline"
          href="logo-dark.svg"
        />
        <g class="translate-1/2">
          <circle
            class="fill-none stroke-zinc-600 dark:stroke-zinc-200"
            r="98"
          />
          <Graduations />
        </g>
        <g aria-hidden="true" class="translate-1/2">
          <ClockHands zone={() => currentZone.value} />
        </g>
      </svg>
      <p
        aria-live="polite"
        class="sr-only"
        data-testid={getTestId(clockLiveRegionId)}
      >
        {time}
      </p>
    </div>
  );
};
