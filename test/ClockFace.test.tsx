import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-preact';

import { ClockFace } from '#src/ClockFace';
import { clockFaceId } from '#src/common';
import { time } from '#src/time';

// Preact 11 defers useEffect cleanup until after paint.
const nextPaint = () => new Promise((resolve) => setTimeout(resolve, 50));

describe('<ClockFace />', () => {
  test('renders clock face', () => {
    const screen = render(<ClockFace />);
    expect(screen.getByTestId(clockFaceId)).toBeInTheDocument();
  });

  test('unmounts clock face', () => {
    const screen = render(<ClockFace />);
    screen.unmount();
    expect(screen.getByTestId(clockFaceId)).not.toBeInTheDocument();
  });

  test('starts the clock loop on mount', async () => {
    const screen = render(<ClockFace />);
    await nextPaint();

    const before = time.second.value;
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // The loop reschedules itself and advances the clock on each frame.
    expect(time.second.value).not.toBe(before);

    screen.unmount();
  });

  test('stops the clock loop on unmount', async () => {
    const screen = render(<ClockFace />);
    await nextPaint();

    screen.unmount();
    await nextPaint();

    const stopped = time.second.value;
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // No frame was rescheduled, so the clock is frozen.
    expect(time.second.value).toBe(stopped);
  });

  test('stop is idempotent', async () => {
    const screen = render(<ClockFace />);
    await nextPaint();

    screen.unmount();
    await nextPaint();

    // Calling stop twice must not throw on an already-cancelled frame.
    expect(() => {
      time.stop();
    }).not.toThrow();
  });
});
