import { render } from 'preact';
import { describe, expect, test, vi } from 'vitest';

describe('index', () => {
  test('render was called', async () => {
    vi.mock('preact', { spy: true });
    await import('@/index');
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(render).toHaveBeenCalledWith(expect.any(Object), document.body);
  });
});
