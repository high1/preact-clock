import type { SVGAttributes } from 'preact';

interface ClockLineProps extends SVGAttributes<SVGLineElement> {
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
    y1={graduation && length - limit}
    y2={-(graduation ? limit : length)}
    {...rest}
  />
);
