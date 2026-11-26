import {
  untracked,
  useComputed,
  useSignal,
  useSignalEffect,
} from '@preact/signals';
import { useRef } from 'preact/hooks';

import { getTimezoneGroups, zoneLabel } from '#src/timezone-options';
import { cx, requireElement } from '#src/utilities';

interface Props {
  class?: string;
  id: string;
  onchange: (zone: string) => void;
  value: string;
  /** Unique IANA timezone identifiers. */
  zones: readonly string[];
}

export const TimezonePicker = (props: Props) => {
  const open = useSignal(false);
  // Starts undefined so the input falls back to an empty value.
  const query = useSignal<string>();
  const activeIndex = useSignal(0);
  const placement = useSignal<'above' | 'below'>('below');
  const openWidthRef = useRef(0);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listBoxRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLElement | null>(null);

  const listboxId = () => `${props.id}-listbox`;
  const optionId = (index: number) => `${listboxId()}-option-${index}`;

  const groups = useComputed(() =>
    getTimezoneGroups(props.zones, query.value ?? ''),
  );

  const options = useComputed(() =>
    groups.value.flatMap(group => group.items.map(item => item.zone)),
  );

  const activeOptionId = useComputed(() =>
    options.value[activeIndex.value] === undefined
      ? undefined
      : optionId(activeIndex.value),
  );

  function closePicker(restoreFocus = false) {
    open.value = false;

    if (restoreFocus) triggerRef.current?.focus();
  }

  function getActiveOption() {
    // Explicit one-time read: scrolling on open must not track activeIndex.
    const index = activeIndex.peek();

    return (
      listBoxRef.current?.querySelector<HTMLElement>(
        `[data-index="${index}"]`,
      ) ?? null
    );
  }

  function placePopup(node: HTMLElement) {
    const triggerElement = requireElement(triggerRef.current, 'trigger');
    const { bottom, top } = triggerElement.getBoundingClientRect();
    const { marginBottom, marginTop } = getComputedStyle(node);

    const roomAbove = top;
    const roomBelow = window.innerHeight - bottom;

    // Add both margins since the gap side depends on the previous placement.
    const needed
      = node.offsetHeight + parseFloat(marginTop) + parseFloat(marginBottom);

    placement.value
      = roomBelow < needed && roomAbove > roomBelow ? 'above' : 'below';
  }

  function scrollToActive(center = false) {
    const option = getActiveOption();
    const list = listBoxRef.current;

    if (!option || !list) return;

    // Option edges relative to the visible area of the list.
    const top
      = option.getBoundingClientRect().top - list.getBoundingClientRect().top;
    const bottom = top + option.offsetHeight - list.clientHeight;

    // Scroll only the list: center on open, otherwise move minimally.
    list.scrollTop += center
      ? top - (list.clientHeight - option.offsetHeight) / 2
      : Math.min(top, 0) + Math.max(bottom, 0);
  }

  function handleDocumentPointerDown(event: PointerEvent) {
    if (
      open.value
      && event.target instanceof Node
      && rootRef.current
      && !rootRef.current.contains(event.target)
    )
      closePicker();
  }

  // Measure and focus after the popup enters the document.
  useSignalEffect(() => {
    const element = popupRef.current;
    if (!open.value || !element) return;

    untracked(() => {
      placePopup(element);
      element.querySelector('input')?.focus({ preventScroll: true });
      scrollToActive(true);
    });
  });

  useSignalEffect(() => {
    const handleResize = () => {
      if (window.innerWidth !== openWidthRef.current) closePicker();
    };

    document.addEventListener('pointerdown', handleDocumentPointerDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('pointerdown', handleDocumentPointerDown);
      window.removeEventListener('resize', handleResize);
    };
  });

  function choose(zone: string) {
    props.onchange(zone);
    closePicker(true);
  }

  function handleSearchInput(
    event: Event & { currentTarget: HTMLInputElement },
  ) {
    query.value = event.currentTarget.value;
    activeIndex.value = 0;

    // The listbox is mounted whenever the search input can receive events.
    requireElement(listBoxRef.current, 'listbox').scrollTop = 0;
  }

  function handleSearchKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        moveTo(activeIndex.value + (event.key === 'ArrowDown' ? 1 : -1));
        break;

      case 'End':
        event.preventDefault();
        moveTo(options.value.length - 1);
        break;

      case 'Enter': {
        // Ignore Enter while composing — IMEs use it to confirm, not select.
        if (event.isComposing) break;

        event.preventDefault();

        const zone = options.value[activeIndex.value];

        if (zone !== undefined) choose(zone);

        break;
      }

      case 'Escape':
        event.preventDefault();
        closePicker(true);
        break;

      case 'Home':
        event.preventDefault();
        moveTo(0);
        break;

      case 'Tab':
        closePicker(true);
        break;
    }
  }

  function handleTriggerClick() {
    if (open.value) closePicker();
    else openPicker();
  }

  function handleTriggerKeydown(event: KeyboardEvent) {
    if (!open.value && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      event.preventDefault();
      openPicker();
    }
  }

  function moveTo(index: number) {
    // Upper bound first, so an empty list leaves the index at 0.
    activeIndex.value = Math.max(Math.min(index, options.value.length - 1), 0);

    scrollToActive();
  }

  function openPicker() {
    query.value = undefined;
    activeIndex.value = Math.max(options.peek().indexOf(props.value), 0);
    openWidthRef.current = window.innerWidth;
    open.value = true;
  }

  return (
    <div
      class={cx('relative', props.class)}
      onFocusOut={(event) => {
        const next = event.relatedTarget;
        if (
          next instanceof Node
          && rootRef.current
          && !rootRef.current.contains(next)
        )
          closePicker();
      }}
      ref={(element) => {
        rootRef.current = element;
      }}
    >
      <button
        aria-controls={open.value ? listboxId() : undefined}
        aria-expanded={open.value ? 'true' : 'false'}
        aria-haspopup="listbox"
        class="flex cursor-pointer items-center justify-between gap-3 rounded-sm border border-zinc-300 px-3 py-2 text-start text-zinc-900 inline-full min-inline-0 dark:border-zinc-600 dark:text-zinc-100"
        id={props.id}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeydown}
        ref={(element) => {
          triggerRef.current = element;
        }}
        type="button"
      >
        <span class="truncate">{zoneLabel(props.value)}</span>
        <span aria-hidden="true">{open.value ? '▴' : '▾'}</span>
      </button>

      {open.value && (
        // Reversed order keeps the input next to the trigger when placed above.
        <div
          class={cx(
            'absolute z-50 flex rounded-sm border border-zinc-300 bg-white text-zinc-900 shadow-lg inline-full dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100',
            placement.value === 'above'
              ? 'inset-be-full mbe-1 flex-col-reverse'
              : 'inset-bs-full mbs-1 flex-col',
          )}
          ref={(element) => {
            popupRef.current = element;
          }}
        >
          <input
            aria-activedescendant={activeOptionId.value}
            aria-autocomplete="list"
            aria-controls={listboxId()}
            aria-expanded="true"
            aria-label="Search timezones"
            class={cx(
              'border-zinc-200 px-3 py-2 outline-none inline-full placeholder:text-zinc-400 dark:border-zinc-600',
              placement.value === 'above' ? 'border-bs' : 'border-be',
            )}
            onInput={handleSearchInput}
            onKeyDown={handleSearchKeydown}
            placeholder="Search timezones…"
            role="combobox"
            type="text"
            value={query.value ?? ''}
          />

          <div
            aria-label="Timezones"
            class="overflow-y-auto overscroll-contain p-1 max-block-80"
            id={listboxId()}
            ref={(element) => {
              listBoxRef.current = element;
            }}
            role="listbox"
          >
            {groups.value.map(group => (
              <div aria-label={group.region} key={group.region} role="group">
                <div class="px-3 py-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  {group.region}
                </div>

                {group.items.map(item => (
                  <button
                    aria-selected={item.zone === props.value ? 'true' : 'false'}
                    class={cx(
                      'flex cursor-pointer items-center justify-between rounded-sm px-3 py-2 text-start text-sm inline-full',
                      item.index === activeIndex.value
                        ? 'bg-zinc-200 ring-2 ring-zinc-900/40 ring-inset dark:bg-zinc-700 dark:ring-zinc-100/40'
                        : 'hover:bg-zinc-100 dark:hover:bg-zinc-700',
                    )}
                    data-index={item.index}
                    id={optionId(item.index)}
                    key={item.zone}
                    onClick={() => {
                      choose(item.zone);
                    }}
                    onPointerDown={(event) => {
                      event.preventDefault();
                    }}
                    role="option"
                    tabIndex={-1}
                    type="button"
                  >
                    <span>{zoneLabel(item.zone)}</span>

                    {item.zone === props.value && (
                      <span aria-hidden="true">✓</span>
                    )}
                  </button>
                ))}
              </div>
            ))}
            {groups.value.length === 0 && (
              <p class="px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400">
                No matching timezones
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
