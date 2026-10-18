import type { SVGAttributes } from 'preact';

export interface ClockLineProps extends Omit<
  SVGAttributes<SVGLineElement>,
  'stroke-linecap' | 'y1' | 'y2'
> {
  graduation?: true;
  length: number;
  limit?: number;
}

export const ClockLine = ({
  graduation,
  length,
  limit = 94,
  ...rest
}: ClockLineProps) => (
  <line
    stroke-linecap="round"
    {...rest}
    y1={graduation && length - limit}
    y2={-(graduation ? limit : length)}
  />
);
