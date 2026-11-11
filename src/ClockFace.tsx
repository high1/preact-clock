import { useComputed, useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';

import { ClockHands } from '#src/ClockHands';
import { clockFaceId, clockLiveRegionId } from '#src/common';
import { Graduations } from '#src/Graduations';
import {
  formatTime,
  getSecondsSinceMidnightIn,
  getTimeZone,
  now,
  startClock,
} from '#src/time';
import { getTestId } from '#src/utilities';

export const ClockFace = () => {
  const zone = useSignal(getTimeZone());
  useEffect(() => startClock(), []);

  const clock = useComputed(() =>
    getSecondsSinceMidnightIn(now.value, zone.value),
  );
  const time = useComputed(() => formatTime(clock.value));

  return (
    <div
      class="grid h-screen place-content-center dark:bg-zinc-800"
      data-testid={getTestId(clockFaceId)}
    >
      <svg
        aria-labelledby="clock-title"
        class="h-[95vmin]"
        role="img"
        viewBox="0 0 200 200"
      >
        <title id="clock-title">Clock</title>
        <image class="size-1/6 translate-5/12" href="logo.svg" />
        <g class="translate-1/2">
          <circle
            class="fill-none stroke-zinc-600 dark:stroke-zinc-200"
            r="98"
          />
          <Graduations />
        </g>
        <g aria-hidden="true" class="translate-1/2">
          <ClockHands clock={clock} />
        </g>
      </svg>
      <p
        aria-live="polite"
        class="sr-only"
        data-testid={getTestId(clockLiveRegionId)}
      >
        {time.value}
      </p>
    </div>
  );
};
