import {
  untracked,
  useComputed,
  useSignal,
  useSignalEffect,
} from '@preact/signals';
import { useRef, useState } from 'preact/hooks';

import { hourFraction, minuteFraction, rotate } from '#src/common';
import { createTime, now, zonedParts } from '#src/time';

export const ANIMATION_DURATION = 500;

const prefersReducedMotion = () =>
  typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const DECIMAL_PRECISION = 4;

/** Signed turn toward the new time in the chosen direction. */
export function directionalDelta(
  from: number,
  to: number,
  forward: boolean,
): number {
  const raw = Number((to - from).toFixed(DECIMAL_PRECISION));

  return raw
    ? forward
      ? raw < 0
        ? raw + 1
        : raw
      : raw >= 0
        ? raw - 1
        : raw
    : 0;
}

// Creates the clock once per zone signal, then animates between zones.
export const useClockAnimation = (
  zone: () => string,
  duration = ANIMATION_DURATION,
) => {
  const [time] = useState(() => createTime(zone));

  const animationStart = useSignal<number>();
  const hourDeltaRef = useRef(0);
  const minuteDeltaRef = useRef(0);
  const previousZoneRef = useRef<string | undefined>(undefined);

  useSignalEffect(() => {
    const currentZone = time.zone; // tracked — re-runs when the zone changes

    if (
      prefersReducedMotion()
      || previousZoneRef.current === undefined
      || previousZoneRef.current === currentZone
    ) {
      previousZoneRef.current = currentZone;
      return;
    }

    const nowValue = untracked(() => now.value);
    const previousParts = zonedParts(nowValue, previousZoneRef.current);
    const newParts = zonedParts(nowValue, currentZone);
    const forward = newParts.offset >= previousParts.offset;

    hourDeltaRef.current = directionalDelta(
      hourFraction(previousParts.wallSeconds),
      hourFraction(newParts.wallSeconds),
      forward,
    );
    minuteDeltaRef.current = directionalDelta(
      minuteFraction(previousParts.wallSeconds),
      minuteFraction(newParts.wallSeconds),
      forward,
    );
    animationStart.value = nowValue;
    previousZoneRef.current = currentZone;
  });

  const progress = useComputed(() => {
    const start = animationStart.value;
    const current = now.value;

    return start === undefined ? 1 : Math.min((current - start) / duration, 1);
  });

  const eased = useComputed(() => {
    const easedProgress = progress.value;

    return easedProgress < 1 ? 1 - (1 - easedProgress) ** 3 : easedProgress; // easeOutCubic
  });

  useSignalEffect(() => {
    if (animationStart.value !== undefined && progress.value === 1)
      animationStart.value = undefined;
  });

  const easedFraction = (part: number, delta: number) =>
    (part - delta * (1 - eased.value) + 1) % 1;

  const subsecond = useComputed(() => rotate(time.subsecond, 0));
  const second = useComputed(() => rotate(time.second, 1));
  const hour = useComputed(() =>
    rotate(
      eased.value === 1 ? time.hour : easedFraction(time.hour, hourDeltaRef.current),
      1,
    ),
  );
  const minute = useComputed(() =>
    rotate(
      eased.value === 1 ? time.minute : easedFraction(time.minute, minuteDeltaRef.current),
      1,
    ),
  );

  return { hour, minute, second, subsecond };
};
