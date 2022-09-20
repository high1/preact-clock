import type { ReadonlySignal } from '@preact/signals';
import type { JSX } from 'preact';

type HandProps = {
  length: number;
  limit?: number;
  stationary?: boolean;
  // transform: ReadonlySignal<string>;
  transform: Pick<ReadonlySignal<string>, 'value'>;
} & Omit<JSX.SVGAttributes<SVGLineElement>, 'transform'>;

export const Hand = ({
  className = '',
  length = 0,
  limit = 94,
  stationary,
  transform: { value },
  ...rest
}: HandProps) => (
  <line
    className={`stroke-cap-round ${className}`}
    transform={value}
    y1={stationary ? length - limit : undefined}
    y2={-(stationary ? limit : length)}
    {...rest}
  />
);
