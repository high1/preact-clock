import { computed, signal } from '@preact/signals';

import {
  hourRotation,
  minuteRotation,
  secondRotation,
  subsecondRotation,
} from '#src/common';

// Wall-clock seconds since local midnight. Uses getters only (no setHours),
// so it never mutates the argument and is immune to DST transition days
// (which have 23 or 25 elapsed hours).
export const getSecondsSinceMidnight = (date: Date = new Date()) =>
  date.getHours() * 3600 +
  date.getMinutes() * 60 +
  date.getSeconds() +
  date.getMilliseconds() / 1000;

// The shared instant. Every clock reads from this single value, so one loop
// drives them all instead of one loop per clock.
export const now = signal(Date.now());

const subscribers = new Set<symbol>();
let frame = 0;

export const startClock = () => {
  const subscriber = Symbol();
  subscribers.add(subscriber);

  if (subscribers.size === 1) {
    const loop = () => {
      now.value = Date.now();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
  }

  return () => {
    if (!subscribers.delete(subscriber)) return;

    if (subscribers.size === 0) {
      cancelAnimationFrame(frame);
    }
  };
};

export const getTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

const formatters = new Map<string, Intl.DateTimeFormat>();

const formatterFor = (zone: string) => {
  const existing = formatters.get(zone);
  if (existing) return existing;

  const formatter = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    hourCycle: 'h23',
    minute: '2-digit',
    numberingSystem: 'latn',
    second: '2-digit',
    timeZone: zone,
  });
  formatters.set(zone, formatter);
  return formatter;
};

const partsIn = (timestamp: number, zone: string) =>
  new Map(
    formatterFor(zone)
      .formatToParts(new Date(timestamp))
      .map((part) => [part.type, part.value] as const),
  );

// Wall-clock seconds since midnight in `zone`.
export const getSecondsSinceMidnightIn = (timestamp: number, zone: string) => {
  const parts = partsIn(timestamp, zone);

  return (
    Number(parts.get('hour')) * 3600 +
    Number(parts.get('minute')) * 60 +
    Number(parts.get('second')) +
    (((timestamp % 1000) + 1000) % 1000) / 1000
  );
};

// One clock in `zone`: the shared instant as individual hand derivations.
export const createTime = (zone: () => string) => {
  const clock = computed(() => getSecondsSinceMidnightIn(now.value, zone()));

  return {
    hour: computed(() => hourRotation(clock.value)),
    minute: computed(() => minuteRotation(clock.value)),
    second: computed(() => secondRotation(clock.value)),
    subsecond: computed(() => subsecondRotation(clock.value)),
  };
};

// Wall-clock HH:MM:SS at quarter-minute boundaries, for announcements.
// Quantizing to 15-second steps is what keeps the live region from
// announcing, and being spoken, on every single second.
export const formatTime = (secondsSinceMidnight: number) => {
  const quantized = Math.floor(secondsSinceMidnight / 15) * 15;
  const hours = Math.floor(quantized / 3600) % 12;
  const minutes = Math.floor((quantized % 3600) / 60);
  const seconds = Math.floor(quantized % 60);
  const formattedHours = hours === 0 ? '12' : String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
