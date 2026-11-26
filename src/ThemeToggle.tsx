import { useSignal, useSignalEffect } from '@preact/signals';
import { useRef } from 'preact/hooks';

import { Moon } from '#src/Moon';
import { Sun } from '#src/Sun';
import { cx } from '#src/utilities';

export const ThemeToggle = () => {
  const isDark = useSignal(false);
  const title = () => `Switch to ${isDark.value ? 'light' : 'dark'} mode`;

  // Lazily created on first use (browser only — never during SSR).
  const mediaQueryRef = useRef<MediaQueryList | null>(null);

  function getMediaQuery() {
    mediaQueryRef.current ??= window.matchMedia('(prefers-color-scheme: dark)');
    return mediaQueryRef.current;
  }

  useSignalEffect(() => {
    const mq = getMediaQuery();
    isDark.value = document.documentElement.classList.contains('dark');

    const savedTheme = () => localStorage.getItem('theme');

    const currentSaved = savedTheme();
    if (currentSaved && (currentSaved === 'dark') === mq.matches)
      localStorage.removeItem('theme');

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (!savedTheme()) {
        isDark.value = event.matches;
        document.documentElement.classList.toggle('dark', event.matches);
        document.documentElement.classList.toggle('light', !event.matches);
      }
    };

    mq.addEventListener('change', handleSystemThemeChange);

    return () => {
      mq.removeEventListener('change', handleSystemThemeChange);
    };
  });

  function toggleTheme() {
    const mq = getMediaQuery();
    const systemWantsDark = mq.matches;

    const next = !isDark.value;
    isDark.value = next;

    document.documentElement.classList.toggle('dark', next);
    document.documentElement.classList.toggle('light', !next);

    if (next === systemWantsDark) localStorage.removeItem('theme');
    else localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  const iconClass = (active: boolean, exitClass: string) =>
    cx(
      'absolute inset-0 block-5 inline-5 motion-safe:[&&]:transition-all',
      active ? 'scale-100 rotate-0 opacity-100' : 'scale-50 opacity-0',
      !active && exitClass,
    );

  return (
    <button
      aria-label={title()}
      class="group relative flex cursor-pointer items-center justify-center rounded-full border border-zinc-200 text-zinc-600 block-10 inline-10 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
      onClick={toggleTheme}
      title={title()}
      type="button"
    >
      <div class="relative block-5 inline-5 group-hover:rotate-10 motion-safe:transition-transform">
        <div class={iconClass(!isDark.value, 'rotate-90')}>
          <Sun />
        </div>
        <div class={iconClass(isDark.value, '-rotate-90')}>
          <Moon />
        </div>
      </div>
    </button>
  );
};
