import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-preact';

import { ClockFace } from '#src/ClockFace';
import { clockFaceId, clockLiveRegionId } from '#src/common';

// Let Preact's passive effects run before asserting.
const settle = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => setTimeout(resolve, 0));
  });

describe('<ClockFace />', () => {
  test('renders clock face', () => {
    const screen = render(<ClockFace />);
    expect(screen.getByTestId(clockFaceId)).toBeInTheDocument();
    screen.unmount();
  });

  test('renders live region announcing the time', () => {
    const screen = render(<ClockFace />);
    expect(screen.getByTestId(clockLiveRegionId)).toBeInTheDocument();
    expect(screen.getByTestId(clockLiveRegionId)).toHaveAttribute(
      'aria-live',
      'polite',
    );
    screen.unmount();
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

describe('<ClockFace /> zone selection', () => {
  test('updates the displayed zone when a new zone is selected', async () => {
    const screen = render(<ClockFace />);
    await settle();

    const initialZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const selectedZone
      = initialZone === 'Pacific/Auckland' ? 'UTC' : 'Pacific/Auckland';
    const expectedLabel
      = selectedZone === 'Pacific/Auckland' ? 'Auckland' : 'UTC';

    const trigger = document.getElementById('clock-timezone');
    trigger?.click();
    await settle();

    await screen.getByText(expectedLabel).click();
    await settle();

    expect(trigger?.textContent ?? '').toContain(expectedLabel);
    screen.unmount();
  });
});
