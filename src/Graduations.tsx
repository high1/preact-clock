import { ClockLine as Graduation } from '@/ClockLine';
import { rotate, seconds } from '@/common';

export const Graduations = () =>
  [...Array(seconds).keys()]
    .map((index) => ({ index, isHour: index % 5 === 0 }))
    .map(({ index, isHour }) => (
      <Graduation
        class={
          isHour
            ? 'stroke-zinc-600 stroke-2 dark:stroke-zinc-200'
            : 'stroke-zinc-200 dark:stroke-zinc-600'
        }
        graduation
        key={index}
        length={isHour ? 6 : 2.5}
        transform={rotate(index / seconds, 0)}
      />
    ));
