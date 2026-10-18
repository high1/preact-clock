import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-preact';

import { clockGraduationId, seconds } from '#src/common';
import { Graduations } from '#src/Graduations';

describe('<Graduations />', () => {
  test('renders all graduations', () => {
    const screen = render(<Graduations />);
    expect(
      screen.getByTestId(new RegExp(`^${clockGraduationId}-(?:\\d|[1-5]\\d)$`)),
    ).toHaveLength(seconds);
  });
});
