import { type Signal, signal } from '@preact/signals';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-preact';

import { ClockHands } from '#src/ClockHands';
import { clockHourId, clockMinuteId, clockSecondId } from '#src/common';
import { getTimeZone, setNow } from '#src/time';
import { ANIMATION_DURATION } from '#src/useClockAnimation';

// Reset the shared clock between tests to avoid inherited state.
const setLocalTime = (hours = 0, minutes = 0, seconds = 0) => {
  vi.setSystemTime(new Date(2020, 0, 1, hours, minutes, seconds, 0));
  setNow(Date.now());
};

// Fake timers need a tick and a microtask for effects and DOM updates.
const setTime = async (timestamp: number) => {
  setNow(timestamp);
  await Promise.resolve();
  vi.advanceTimersByTime(100); // flush rAF-deferred signal effects
  await Promise.resolve();
};

const changeZone = async (zone: Signal<string>, next: string) => {
  zone.value = next;
  await Promise.resolve(); // let the harness re-render and schedule the effect
  vi.advanceTimersByTime(100); // flush rAF-deferred animation effects
  await Promise.resolve();
};

const mountZone = (zone: Signal<string>) =>
  render(<ClockHands zone={() => zone.value} />);

const renderAtZone = (zone: string) => mountZone(signal(zone));

const renderWithZone = (initialZone: string) => {
  const zone = signal(initialZone);
  const screen = mountZone(zone);
  return { screen, zone };
};

const angleOf = (el: Element | null) =>
  Number(el?.getAttribute('transform')?.split('(')[1]?.split(')')[0]);

beforeEach(() => {
  vi.useFakeTimers();
  setLocalTime();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

// Minute and second hands share the same domain: 0–59 units, 6° per unit.
const minuteSecondCases = [
  [0, 'rotate(0)'],
  [1, 'rotate(6)'],
  [15, 'rotate(90)'],
  [30, 'rotate(180)'],
  [59, 'rotate(354)'],
] as const;

describe('<ClockHands /> in a fixed zone', () => {
  test.each([
    [0, 'rotate(0)'],
    [3, 'rotate(90)'],
    [6, 'rotate(180)'],
    [11, 'rotate(330)'],
  ])('renders hour %i in UTC as %s', async (hours, transform) => {
    await setTime(Date.UTC(2020, 0, 1, hours, 0, 0, 0));
    const screen = renderAtZone('UTC');
    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      transform,
    );
    screen.unmount();
  });

  test('renders second 15 in UTC', async () => {
    await setTime(Date.UTC(2020, 0, 1, 0, 0, 15, 0));
    const screen = renderAtZone('UTC');
    expect(screen.getByTestId(clockSecondId)).toHaveAttribute(
      'transform',
      'rotate(90)',
    );
    screen.unmount();
  });

  test.each(minuteSecondCases)(
    'renders minute %i in UTC as %s',
    async (minutes, transform) => {
      await setTime(Date.UTC(2020, 0, 1, 0, minutes, 0, 0));
      const screen = renderAtZone('UTC');
      expect(screen.getByTestId(clockMinuteId)).toHaveAttribute(
        'transform',
        transform,
      );
      screen.unmount();
    },
  );

  test.each(minuteSecondCases)(
    'renders second %i in UTC as %s',
    async (seconds, transform) => {
      await setTime(Date.UTC(2020, 0, 1, 0, 0, seconds, 0));
      const screen = renderAtZone('UTC');
      expect(screen.getByTestId(clockSecondId)).toHaveAttribute(
        'transform',
        transform,
      );
      screen.unmount();
    },
  );
});

describe('<ClockHands />', () => {
  test.each([
    [0, 'rotate(0)'],
    [1, 'rotate(30)'],
    [3, 'rotate(90)'],
    [6, 'rotate(180)'],
    [11, 'rotate(330)'],
    [12, 'rotate(0)'],
  ])('renders hour %i as %s', (hours, transform) => {
    setLocalTime(hours);
    const screen = renderAtZone(getTimeZone());
    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      transform,
    );
    screen.unmount();
  });

  test('defaults to the runtime timezone', () => {
    setLocalTime(3);
    const screen = renderAtZone(getTimeZone());
    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      'rotate(90)',
    );
    screen.unmount();
  });
});

describe('<ClockHands /> zone change animation', () => {
  const start = Date.UTC(2020, 0, 1, 0, 0, 0, 0);
  const mid = ANIMATION_DURATION / 5;

  test('animates the hour hand when the zone changes', async () => {
    await setTime(start);
    const { screen, zone } = renderWithZone('UTC');

    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      'rotate(0)',
    );

    // Europe/Berlin is UTC+1, so the hour hand moves from 0° to 30°.
    await changeZone(zone, 'Europe/Berlin');

    // Mid-animation: the hand is between the old and the new position.
    await setTime(start + mid);
    expect(screen.getByTestId(clockHourId)).not.toHaveAttribute(
      'transform',
      'rotate(0)',
    );
    expect(screen.getByTestId(clockHourId)).not.toHaveAttribute(
      'transform',
      'rotate(30)',
    );

    // Animation complete.
    await setTime(start + ANIMATION_DURATION);
    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      'rotate(30)',
    );
    screen.unmount();
  });

  test('animates the minute hand when the zone changes', async () => {
    await setTime(start);
    const { screen, zone } = renderWithZone('UTC');

    expect(screen.getByTestId(clockMinuteId)).toHaveAttribute(
      'transform',
      'rotate(0)',
    );

    // Asia/Kathmandu is UTC+5:45, so the minute hand moves from 0° to 270°.
    await changeZone(zone, 'Asia/Kathmandu');

    await setTime(start + mid);
    expect(screen.getByTestId(clockMinuteId)).not.toHaveAttribute(
      'transform',
      'rotate(0)',
    );
    expect(screen.getByTestId(clockMinuteId)).not.toHaveAttribute(
      'transform',
      'rotate(270)',
    );

    await setTime(start + ANIMATION_DURATION);
    expect(angleOf(screen.getByTestId(clockMinuteId).element())).toBeCloseTo(
      270,
      0,
    );
    screen.unmount();
  });

  test('does not animate when switching between zones with the same offset', async () => {
    // Paris and Berlin share CET, so both read 01:00 in January.
    await setTime(start);
    const { screen, zone } = renderWithZone('Europe/Paris');

    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      'rotate(30)',
    );

    await changeZone(zone, 'Europe/Berlin');

    await setTime(start + ANIMATION_DURATION);
    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      'rotate(30)',
    );
    screen.unmount();
  });

  test('animates forward across zones more than 12h apart', async () => {
    // Sydney is ahead of LA, so the hands must advance.
    await setTime(Date.UTC(2020, 0, 1, 12, 0, 0, 0));
    const { screen, zone } = renderWithZone('America/Los_Angeles');

    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      'rotate(120)',
    );

    await changeZone(zone, 'Australia/Sydney');

    await setTime(Date.UTC(2020, 0, 1, 12, 0, 0, ANIMATION_DURATION)); // 04:00 in LA, 23:00 in Sydney
    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      'rotate(330)',
    );
    screen.unmount();
  });

  test('does not animate the minute hand between whole-hour offset zones', async () => {
    await setTime(Date.UTC(2020, 0, 1, 12, 0, 0, 0)); // Belgrade = 13:00, Khandyga = 21:00
    const { screen, zone } = renderWithZone('Asia/Khandyga');

    await changeZone(zone, 'Europe/Belgrade');

    await setTime(Date.UTC(2020, 0, 1, 12, 0, 0, 600));
    expect(angleOf(screen.getByTestId(clockMinuteId).element())).toBeCloseTo(
      0,
      0,
    );
    screen.unmount();
  });

  test('redirects a minute-hand animation mid-flight', async () => {
    await setTime(start);
    const { screen, zone } = renderWithZone('UTC');

    // Start animating toward Asia/Kathmandu (UTC+5:45) — minute hand moves.
    await changeZone(zone, 'Asia/Kathmandu');

    // Mid-flight: minute hand is partway to 270°.
    await setTime(start + mid);
    expect(screen.getByTestId(clockMinuteId)).not.toHaveAttribute(
      'transform',
      'rotate(0)',
    );

    // Redirect to Asia/Tokyo (UTC+9, on the hour) — minute hand moves back.
    await changeZone(zone, 'Asia/Tokyo');

    await setTime(start + mid + ANIMATION_DURATION);
    expect(angleOf(screen.getByTestId(clockMinuteId).element())).toBeCloseTo(
      0,
      0,
    );
    screen.unmount();
  });

  test('redirects the animation when the zone changes mid-animation', async () => {
    await setTime(start);
    const { screen, zone } = renderWithZone('UTC');

    // Start animating toward Europe/Berlin (+1 hour).
    await changeZone(zone, 'Europe/Berlin');

    // Berlin is on the hour — the minute hand does not move.
    await setTime(start + mid);
    expect(screen.getByTestId(clockMinuteId)).toHaveAttribute(
      'transform',
      'rotate(0)',
    );

    // Redirect to Asia/Kathmandu (UTC+5:45) — minute hand moves.
    await changeZone(zone, 'Asia/Kathmandu');

    await setTime(start + mid + ANIMATION_DURATION);
    expect(angleOf(screen.getByTestId(clockMinuteId).element())).toBeCloseTo(
      270,
      0,
    );
    screen.unmount();
  });
});
