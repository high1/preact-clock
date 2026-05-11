import { ClockLine as Graduation } from '#src/ClockLine';
import { rotate, seconds } from '#src/common';

export const Graduations = () =>
  Array.from(Array(seconds).keys(), (index) => ({
    index,
    isHour: index % 5 === 0,
  })).map(({ index, isHour }) => (
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
