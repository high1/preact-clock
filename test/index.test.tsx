import { render } from 'preact';
import { describe, expect, test, vi } from 'vitest';

vi.mock('preact', { spy: true });

describe('index', () => {
  test('render was called', async () => {
    await import('#src/index');
    expect(render).toHaveBeenCalledWith(expect.any(Object), document.body);
  });
});
