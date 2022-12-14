import { useComputed, useSignal, useSignalEffect } from '@preact/signals';
import { ClockHand } from 'ClockHand';

const length = 60;

export const ClockFace = () => {
  const getSecondsSinceMidnight = (): number =>
    (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;
  const time = useSignal(getSecondsSinceMidnight());

  const rotate = (rotate: number, fractionDigits = 1) =>
    `rotate(${(rotate * 360).toFixed(fractionDigits)})`;
  const miliseconds = useComputed(() => rotate(time.value % 1, 0));
  const seconds = useComputed(() => rotate((time.value % 60) / 60));
  const minutes = useComputed(() => rotate(((time.value / 60) % 60) / 60));
  const hours = useComputed(() => rotate(((time.value / 60 / 60) % 12) / 12));

  useSignalEffect(() => {
    let frame = requestAnimationFrame(function loop() {
      time.value = getSecondsSinceMidnight();
      frame = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(frame);
  });

  return (
    <div className="flex items-center justify-center h-screen @dark:bg-neutral-700">
      <svg viewBox="0 0 200 200" className="h-95vmin">
        <g className="translate-100px">
          <circle
            className="stroke-neutral-900 @dark:stroke-neutral-100 fill-none"
            r="99"
          />
          {Array.from({ length }, (_, index) => index % 5 === 0).map(
            (isHour, index) => (
              <ClockHand
                key={index}
                transform={rotate(index / length, 0)}
                class={
                  isHour
                    ? 'stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-2'
                    : 'stroke-neutral-400 @dark:stroke-neutral-600'
                }
                length={isHour ? 7 : 3}
                stationary
              />
            )
          )}
        </g>
        <g className="translate-100px">
          <ClockHand
            transform={miliseconds}
            class="stroke-neutral-200 @dark:stroke-neutral-600 stroke-width-5"
            length={83}
          />
          <ClockHand
            transform={hours}
            class="stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-4"
            length={50}
          />
          <ClockHand
            transform={minutes}
            class="stroke-neutral-800 @dark:stroke-neutral-200 stroke-width-3"
            length={70}
          />
          <ClockHand
            transform={seconds}
            class="stroke-red-500 stroke-width-2"
            length={77}
          />
        </g>
      </svg>
    </div>
  );
};
