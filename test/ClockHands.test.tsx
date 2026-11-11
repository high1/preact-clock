import { useSignal } from '@preact/signals';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-preact';

import { ClockHands } from '#src/ClockHands';
import { clockHourId, clockMinuteId, clockSecondId } from '#src/common';
import { getSecondsSinceMidnight } from '#src/time';

const ClockHandsHarness = () => {
  const clock = useSignal(getSecondsSinceMidnight());
  return <ClockHands clock={clock} />;
};

const renderClockHands = () => render(<ClockHandsHarness />);

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
    const screen = renderClockHands();
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
      const screen = renderClockHands();
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
      const screen = renderClockHands();
      expect(screen.getByTestId(clockSecondId)).toHaveAttribute(
        'transform',
        transform,
      );
      screen.unmount();
    },
  );
});
