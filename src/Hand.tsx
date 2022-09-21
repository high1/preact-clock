import type { ReadonlySignal } from '@preact/signals';
import type { JSX } from 'preact';

type HandProps = {
  length: number;
  limit?: number;
  stationary?: boolean;
  transform?: ReadonlySignal<string> | string;
} & Omit<JSX.SVGAttributes<SVGLineElement>, 'transform'>;

export const Hand = ({
  className = '',
  length = 0,
  limit = 94,
  stationary,
  ...rest
}: HandProps) => (
  // https://github.com/preactjs/signals/issues/106
  // @ts-expect-error Type 'ReadonlySignal<string>' is not assignable to type 'string'.ts(2322)
  <line
    className={`stroke-cap-round ${className}`}
    y1={stationary ? length - limit : undefined}
    y2={-(stationary ? limit : length)}
    {...rest}
  />
);
