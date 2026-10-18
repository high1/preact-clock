import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-preact';

import { ClockHands } from '#src/ClockHands';
import { clockHourId, clockMinuteId, clockSecondId } from '#src/common';
import { time } from '#src/time';

// `time` is a module-level signal model, so every test starts from a known
// clock rather than inheriting whatever the previous test left behind.
const setTime = (hours = 0, minutes = 0, seconds = 0) => {
  vi.setSystemTime(new Date(2020, 0, 1, hours, minutes, seconds, 0));
  time.update();
};

beforeEach(() => {
  setTime();
});

// Minute and second hands share the same domain: 0–59 units, 6° per unit.
const minuteSecondCases = [
  [0, 'rotate(0.0)'],
  [1, 'rotate(6.0)'],
  [15, 'rotate(90.0)'],
  [30, 'rotate(180.0)'],
  [59, 'rotate(354.0)'],
] as const;

describe('<ClockHands />', () => {
  test.each([
    [0, 'rotate(0.0)'],
    [1, 'rotate(30.0)'],
    [3, 'rotate(90.0)'],
    [6, 'rotate(180.0)'],
    [11, 'rotate(330.0)'],
    [12, 'rotate(0.0)'],
  ])('renders hour %i as %s', (hours, transform) => {
    setTime(hours);
    const screen = render(<ClockHands />);
    expect(screen.getByTestId(clockHourId)).toHaveAttribute(
      'transform',
      transform,
    );
  });

  test.each(minuteSecondCases)(
    'renders minute %i as %s',
    (minutes, transform) => {
      setTime(0, minutes);
      const screen = render(<ClockHands />);
      expect(screen.getByTestId(clockMinuteId)).toHaveAttribute(
        'transform',
        transform,
      );
    },
  );

  test.each(minuteSecondCases)(
    'renders second %i as %s',
    (seconds, transform) => {
      setTime(0, 0, seconds);
      const screen = render(<ClockHands />);
      expect(screen.getByTestId(clockSecondId)).toHaveAttribute(
        'transform',
        transform,
      );
    },
  );
});
