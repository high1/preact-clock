import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import {
  hourRotation,
  minuteRotation,
  secondRotation,
  subsecondRotation,
} from '#src/common';
import {
  formatTime,
  getSecondsSinceMidnight,
  getSecondsSinceMidnightIn,
  getTimeZone,
  now,
  startClock,
} from '#src/time';

afterEach(() => {
  vi.useRealTimers();
});

describe('getSecondsSinceMidnight', () => {
  test('runs in the requested timezone', () => {
    const expected = import.meta.env.VITE_TZ;
    if (expected)
      expect(Intl.DateTimeFormat().resolvedOptions().timeZone).toBe(expected);
  });

  test('includes milliseconds', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 15, 12, 0, 0, 500));

    expect(getSecondsSinceMidnight()).toBeCloseTo(43_200.5, 3);
  });

  test.each([
    ['midnight', new Date(2020, 0, 1, 0, 0, 0, 0), 0],
    ['one second past midnight', new Date(2020, 0, 1, 0, 0, 1, 0), 1],
    ['one minute past midnight', new Date(2020, 0, 1, 0, 1, 0, 0), 60],
    ['noon', new Date(2020, 0, 1, 12, 0, 0, 0), 43_200],
    ['last second of the day', new Date(2020, 0, 1, 23, 59, 59, 0), 86_399],
    ['sub-second precision', new Date(2020, 0, 1, 1, 2, 3, 500), 3723.5],
  ])('%s', (_name, date, expected) => {
    expect(getSecondsSinceMidnight(date)).toBe(expected);
  });

  test('does not mutate the supplied date', () => {
    const date = new Date(2020, 0, 1, 12, 0, 0, 0);
    const before = date.getTime();

    getSecondsSinceMidnight(date);

    expect(date.getTime()).toBe(before);
  });

  // Comparing two live readings would flake across midnight, so pin the clock
  // and assert the exact value instead.
  test('defaults to now', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2020, 0, 1, 12, 0, 0, 0));

    expect(getSecondsSinceMidnight()).toBe(43_200);
  });

  // A DST transition day is one where the UTC offset at local midnight differs
  // from the offset at local noon: the clocks moved in between. Noon on such a
  // day is 12:00 wall-clock no matter how much real time elapsed since local
  // midnight, so measuring elapsed time instead puts it an hour out.
  const transitionNoons = (year: number) => {
    const found: { kind: 'fall back' | 'spring forward'; noon: Date }[] = [];
    for (let day = 0; day < 366; day++) {
      const midnight = new Date(year, 0, 1 + day, 0, 0, 0);
      if (midnight.getFullYear() !== year) break;
      const noon = new Date(year, midnight.getMonth(), midnight.getDate(), 12);
      const change = midnight.getTimezoneOffset() - noon.getTimezoneOffset();
      if (change !== 0)
        found.push({ kind: change > 0 ? 'spring forward' : 'fall back', noon });
    }
    return found;
  };

  describe('across daylight saving transitions', () => {
    const transitions = transitionNoons(2020);

    // Skips rather than passes vacuously when the timezone has no DST. CI runs
    // this suite across several zones so the skip is never what actually runs.
    test.skipIf(transitions.length === 0)(
      'noon stays at 12:00 wall-clock on every transition day',
      () => {
        for (const { kind, noon } of transitions)
          expect(getSecondsSinceMidnight(noon), kind).toBe(12 * 3600);
      },
    );
  });
});

describe('rotations', () => {
  test.each([
    ['midnight', 0, 'rotate(0)', 'rotate(0)', 'rotate(0)', 'rotate(0)'],
    ['one hour', 3_600, 'rotate(0)', 'rotate(0)', 'rotate(0)', 'rotate(30)'],
    [
      'half past noon',
      43_200 + 1_800,
      'rotate(0)',
      'rotate(0)',
      'rotate(180)',
      'rotate(15)',
    ],
    [
      '59.5 seconds',
      59.5,
      'rotate(180)',
      'rotate(357)',
      'rotate(5.9)',
      'rotate(0.5)',
    ],
    [
      'next midnight',
      86_400,
      'rotate(0)',
      'rotate(0)',
      'rotate(0)',
      'rotate(0)',
    ],
  ])('%s', (_name, clock, subsecond, second, minute, hour) => {
    expect(subsecondRotation(clock)).toBe(subsecond);
    expect(secondRotation(clock)).toBe(second);
    expect(minuteRotation(clock)).toBe(minute);
    expect(hourRotation(clock)).toBe(hour);
  });
});

describe('formatTime', () => {
  test.each([
    [0, '12:00:00'], // midnight
    [14.9, '12:00:00'], // partway through the first quarter-minute bucket
    [15, '12:00:15'], // each bucket edge starts the next announcement
    [12 * 3600, '12:00:00'], // noon
    [13 * 3600 + 42 * 60 + 10, '01:42:00'],
    [23 * 3600 + 59 * 60 + 59, '11:59:45'],
  ])('%s seconds since midnight → %s', (seconds, expected) => {
    expect(formatTime(seconds)).toBe(expected);
  });
});

describe('getTimeZone', () => {
  test('returns the runtime timezone as a string', () => {
    expect(typeof getTimeZone()).toBe('string');
    expect(getTimeZone().length).toBeGreaterThan(0);
  });
});

describe('getSecondsSinceMidnightIn', () => {
  test.each([
    ['midnight', Date.UTC(2020, 0, 1, 0, 0, 0, 0), 0],
    ['one second past midnight', Date.UTC(2020, 0, 1, 0, 0, 1, 0), 1],
    ['one minute past midnight', Date.UTC(2020, 0, 1, 0, 1, 0, 0), 60],
    ['noon', Date.UTC(2020, 0, 1, 12, 0, 0, 0), 43_200],
    ['last second of the day', Date.UTC(2020, 0, 1, 23, 59, 59, 0), 86_399],
  ])('%s in UTC', (_name, timestamp, expected) => {
    expect(getSecondsSinceMidnightIn(timestamp, 'UTC')).toBe(expected);
  });

  test('renders the same instant in different zones', () => {
    const timestamp = Date.UTC(2020, 2, 8, 16, 30, 0, 0);

    expect(getSecondsSinceMidnightIn(timestamp, 'UTC')).toBe(16 * 3600 + 1800);
    expect(getSecondsSinceMidnightIn(timestamp, 'Europe/Berlin')).toBe(
      17 * 3600 + 1800,
    );
    expect(getSecondsSinceMidnightIn(timestamp, 'America/New_York')).toBe(
      12 * 3600 + 1800,
    );
    expect(getSecondsSinceMidnightIn(timestamp, 'Australia/Sydney')).toBe(
      3 * 3600 + 1800,
    );
  });

  test('converts timestamps to Berlin wall-clock time', () => {
    const spring = Date.UTC(2020, 2, 8, 11, 0, 0, 0);
    const autumn = Date.UTC(2020, 10, 1, 11, 0, 0, 0);

    expect(getSecondsSinceMidnightIn(spring, 'Europe/Berlin')).toBe(12 * 3600);
    expect(getSecondsSinceMidnightIn(autumn, 'Europe/Berlin')).toBe(12 * 3600);
  });

  test('spring forward skips from 01:59:59 to 03:00:00', () => {
    const before = Date.UTC(2020, 2, 29, 0, 59, 59);
    const after = Date.UTC(2020, 2, 29, 1, 0, 0);

    expect(getSecondsSinceMidnightIn(before, 'Europe/Berlin')).toBe(7199);
    expect(getSecondsSinceMidnightIn(after, 'Europe/Berlin')).toBe(10800);
  });

  test('fall back repeats the 02:00 hour', () => {
    const before = Date.UTC(2020, 9, 25, 0, 59, 59);
    const after = Date.UTC(2020, 9, 25, 1, 0, 0);

    expect(getSecondsSinceMidnightIn(before, 'Europe/Berlin')).toBe(10799);
    expect(getSecondsSinceMidnightIn(after, 'Europe/Berlin')).toBe(7200);
  });
});

describe('startClock', () => {
  const cleanups = new Set<() => void>();

  const start = () => {
    const stop = startClock();
    cleanups.add(stop);
    return () => {
      cleanups.delete(stop);
      stop();
    };
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(globalThis, 'requestAnimationFrame');
  });

  afterEach(() => {
    cleanups.forEach((stop) => {
      stop();
    });
    cleanups.clear();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  test('schedules one rAF loop for the first subscriber', () => {
    const stop = start();

    expect(vi.mocked(globalThis.requestAnimationFrame)).toHaveBeenCalledTimes(
      1,
    );

    const before = now.value;
    vi.advanceTimersToNextFrame();
    expect(now.value).not.toBe(before);

    stop();
  });

  test('reuses the same loop for additional subscribers', () => {
    const stopFirst = start();
    const stopSecond = start();
    const stopThird = start();

    expect(vi.mocked(globalThis.requestAnimationFrame)).toHaveBeenCalledTimes(
      1,
    );

    stopFirst();
    stopSecond();
    stopThird();
  });

  test('stops updating the instant after unmount', () => {
    const stop = start();

    vi.advanceTimersToNextFrame();
    const afterRun = now.value;
    expect(afterRun).toBeGreaterThan(0);

    stop();
    vi.advanceTimersToNextFrame();

    expect(now.value).toBe(afterRun);
  });

  test('keeps the loop running while any subscriber remains', () => {
    const stopFirst = start();
    const stopSecond = start();
    const stopThird = start();

    vi.advanceTimersToNextFrame();
    const before = now.value;
    expect(before).toBeGreaterThan(0);

    stopFirst();
    stopSecond();

    vi.advanceTimersToNextFrame();
    expect(now.value).not.toBe(before);

    stopThird();
  });

  test('restarts the loop when a new subscriber mounts after unmount', () => {
    const stop = start();
    stop();

    start()();
    expect(vi.mocked(globalThis.requestAnimationFrame)).toHaveBeenCalledTimes(
      2,
    );
  });

  test('calling stop more than once does not prevent a later clock from starting', () => {
    const stop = start();
    stop();
    stop();

    const stopNext = start();

    expect(vi.mocked(globalThis.requestAnimationFrame)).toHaveBeenCalledTimes(
      2,
    );

    stopNext();
  });
});
