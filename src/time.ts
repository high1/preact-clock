import { computed, signal } from '@preact/signals';

import {
  hourFraction,
  minuteFraction,
  secondFraction,
  subsecondFraction,
} from '#src/common';
import { filterTimeZones } from '#src/timezone-options';

export const getSecondsSinceMidnight = (date: Date = new Date()) =>
  toSeconds(
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  );

export const toSeconds = (
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds: number,
) => hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;

// Shared instant driven by one rAF loop.
export const now = signal(Date.now());

// Test helper for advancing the shared clock without waiting for a frame.
export const setNow = (timestamp: number) => {
  now.value = timestamp;
};

let subscribers = 0;
let frame = 0;

export const startClock = () => {
  subscribers++;

  if (subscribers === 1) {
    frame = requestAnimationFrame(function loop() {
      now.value = Date.now();
      frame = requestAnimationFrame(loop);
    });
  }

  let stopped = false;
  return () => {
    if (stopped) return;
    stopped = true;
    subscribers--;

    if (subscribers === 0) cancelAnimationFrame(frame);
  };
};

export const getTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getTimeZones = (): string[] =>
  filterTimeZones(Intl.supportedValuesOf('timeZone'));

const formatters = new Map<string, Intl.DateTimeFormat>();

const formatterFor = (zone: string) => {
  const existing = formatters.get(zone);
  if (existing) return existing;

  const formatter = new Intl.DateTimeFormat(undefined, {
    calendar: 'gregory',
    day: 'numeric',
    hour: 'numeric',
    hourCycle: 'h23',
    minute: 'numeric',
    month: 'numeric',
    numberingSystem: 'latn',
    second: 'numeric',
    timeZone: zone,
    year: 'numeric',
  });
  formatters.set(zone, formatter);
  return formatter;
};

export const zonedParts = (timestamp: number, zone: string) => {
  const {
    day = 1,
    hour = 0,
    minute = 0,
    month = 1,
    second = 0,
    year = 0,
  } = formatterFor(zone)
    .formatToParts(timestamp)
    .reduce<Partial<Record<Intl.DateTimeFormatPartTypes, number>>>(
      (numbers, { type, value }) => {
        numbers[type] = Number(value);
        return numbers;
      },
      {},
    );

  const ms = ((timestamp % 1000) + 1000) % 1000;

  return {
    offset: Math.floor(
      (Date.UTC(year, month - 1, day, hour, minute, second, ms) - timestamp)
      / 1000,
    ),
    wallSeconds: toSeconds(hour, minute, second, ms),
  };
};

// Wall-clock seconds since midnight in `zone`.
export const getSecondsSinceMidnightIn = (timestamp: number, zone: string) =>
  zonedParts(timestamp, zone).wallSeconds;

// Quarter-minute steps keep screen-reader announcements from chattering.
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

// One clock's hand fractions, derived from the shared instant.
export const createTime = (zone: () => string) => {
  const clock = computed(() => zonedParts(now.value, zone()).wallSeconds);

  return {
    get hour() {
      return hourFraction(clock.value);
    },
    get minute() {
      return minuteFraction(clock.value);
    },
    get second() {
      return secondFraction(clock.value);
    },
    get subsecond() {
      return subsecondFraction(clock.value);
    },
    get zone() {
      return zone();
    },
  };
};
