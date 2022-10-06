import type { JSX } from 'preact';

type ClockHandProps = {
  length: number;
  limit?: number;
  stationary?: boolean;
} & JSX.SVGAttributes<SVGLineElement>;

export const ClockHand = ({
  length = 0,
  limit = 94,
  stationary,
  ...rest
}: ClockHandProps) => (
  <line
    y1={stationary ? length - limit : undefined}
    y2={-(stationary ? limit : length)}
    stroke-linecap={'round'}
    {...rest}
  />
);
