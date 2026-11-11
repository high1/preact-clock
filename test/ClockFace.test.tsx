import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-preact';

import { ClockFace } from '#src/ClockFace';
import { clockFaceId, clockLiveRegionId } from '#src/common';

describe('<ClockFace />', () => {
  test('renders clock face', () => {
    const screen = render(<ClockFace />);
    expect(screen.getByTestId(clockFaceId)).toBeInTheDocument();
  });

  test('renders live region announcing the time', () => {
    const screen = render(<ClockFace />);
    expect(screen.getByTestId(clockLiveRegionId)).toBeInTheDocument();
    expect(screen.getByTestId(clockLiveRegionId)).toHaveAttribute(
      'aria-live',
      'polite',
    );
  });

  test('unmounts clock face', () => {
    const screen = render(<ClockFace />);
    screen.unmount();
    expect(screen.getByTestId(clockFaceId)).not.toBeInTheDocument();
  });

  test('cancels the animation frame on unmount', () => {
    const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame');
    const screen = render(<ClockFace />);
    screen.unmount();
    expect(cancelSpy).toHaveBeenCalled();
    cancelSpy.mockRestore();
  });
});
