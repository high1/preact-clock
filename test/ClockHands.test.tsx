import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-preact';

import { ClockHands } from '#src/ClockHands';
import { clockHourId, clockMinuteId, clockSecondId } from '#src/common';

describe('<ClockHands />', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  test.each([
    [0, 'rotate(0)'],
    [1, 'rotate(30)'],
    [3, 'rotate(90)'],
    [6, 'rotate(180)'],
    [11, 'rotate(330)'],
    [12, 'rotate(0)'],
  ])('renders hour %i as %s', (hours, transform) => {
    vi.setSystemTime(new Date(2020, 0, 1, hours, 0, 0, 0));
    const screen = render(<ClockHands />);
    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      transform,
    );
    screen.unmount();
  });

  const minuteSecondCases = [
    [0, 'rotate(0)'],
    [1, 'rotate(6)'],
    [15, 'rotate(90)'],
    [30, 'rotate(180)'],
    [59, 'rotate(354)'],
  ] as const;

  test.each(minuteSecondCases)(
    'renders minute %i as %s',
    (minutes, transform) => {
      vi.setSystemTime(new Date(2020, 0, 1, 0, minutes, 0, 0));
      const screen = render(<ClockHands />);
      expect(screen.getByTestId(clockMinuteId)).toHaveAttribute(
        'transform',
        transform,
      );
      screen.unmount();
    },
  );

  test.each(minuteSecondCases)(
    'renders second %i as %s',
    (seconds, transform) => {
      vi.setSystemTime(new Date(2020, 0, 1, 0, 0, seconds, 0));
      const screen = render(<ClockHands />);
      expect(screen.getByTestId(clockSecondId)).toHaveAttribute(
        'transform',
        transform,
      );
      screen.unmount();
    },
  );

  // Preact flushes effects after paint, so the loop only starts once a frame
  // has gone by. Ticking frames drives the callback that keeps the clock alive.
  test('keeps advancing the clock on every frame', async () => {
    vi.setSystemTime(new Date(2020, 0, 1, 0, 0, 0, 0));
    const screen = render(<ClockHands />);
    const secondHand = () =>
      screen.getByTestId(clockSecondId).element().getAttribute('transform');

    const seen: (null | string)[] = [];
    for (let i = 0; i < 3; i++) {
      vi.advanceTimersToNextFrame();
      vi.advanceTimersByTime(1000);
      await Promise.resolve();
      // The signal writes the attribute on the frame after the clock ticks.
      vi.advanceTimersToNextFrame();
      await Promise.resolve();
      seen.push(secondHand());
    }

    // The hand keeps moving rather than freezing after the first frame.
    expect(new Set(seen).size).toBe(3);

    screen.unmount();
  });

  test('starts the loop on mount', () => {
    const frame = vi.spyOn(window, 'requestAnimationFrame');
    const screen = render(<ClockHands />);

    // The loop asks for a frame, and that frame is the only timer pending.
    expect(frame).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(1);

    screen.unmount();
  });

  test('stops the loop on unmount', () => {
    const frame = vi.spyOn(window, 'requestAnimationFrame');
    const screen = render(<ClockHands />);
    vi.advanceTimersToNextFrame(); // the loop runs and asks for another frame
    const asked = frame.mock.calls.length;

    screen.unmount();

    // The pending frame is cancelled, and the loop asks for no more.
    expect(vi.getTimerCount()).toBe(0);
    expect(frame).toHaveBeenCalledTimes(asked);
  });
});
