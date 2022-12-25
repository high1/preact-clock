import type { JSX } from 'preact';

interface ClockHandProps extends JSX.SVGAttributes<SVGLineElement> {
  length: number;
  limit?: number;
  stationary?: boolean;
}

export const ClockHand = ({
  length = 0,
  limit = 94,
  stationary,
  ...rest
}: ClockHandProps) => (
  <line
    {...(stationary && { y1: length - limit })}
    y2={-(stationary ? limit : length)}
    stroke-linecap={'round'}
    {...rest}
  />
);
