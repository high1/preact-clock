import { afterEach, describe, expect, test, vi } from 'vitest';

import { cx, getTestId, requireElement } from '#src/utilities';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('getTestId', () => {
  test('returns undefined outside test builds', () => {
    vi.stubEnv('MODE', 'development');

    expect(getTestId('test')).toBeUndefined();
  });

  // Production must never expose the attribute in the DOM.
  test('returns undefined in production builds', () => {
    vi.stubEnv('MODE', 'production');

    expect(getTestId('test')).toBeUndefined();
  });

  test('returns the id in test builds', () => {
    vi.stubEnv('MODE', 'test');

    expect(getTestId('test')).toBe('test');
  });
});

describe('cx', () => {
  test('joins class names with spaces', () => {
    expect(cx('relative', 'flex', 'items-center')).toBe(
      'relative flex items-center',
    );
  });

  test('skips falsy parts', () => {
    expect(cx('relative', false, null, undefined, 'flex')).toBe(
      'relative flex',
    );
  });
});

describe('requireElement', () => {
  test('returns the element', () => {
    const element = document.createElement('div');
    expect(requireElement(element, 'listbox')).toBe(element);
  });

  test('throws when the element is missing', () => {
    expect(() => requireElement(null, 'trigger')).toThrow('Missing trigger');
  });
});
